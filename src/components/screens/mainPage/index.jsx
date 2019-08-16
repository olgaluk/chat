import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { connect } from 'react-redux';

import { changeMessages } from '../../../actions/chatActions';

import Header from './Header';
import Footer from '../../Footer';
import SendMessageForm from './SendMessageForm';
import MessageList from './MessageList';

import 'react-notifications/lib/notifications.css';
import './index.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeMessages: (messages) => dispatch(changeMessages(messages)),
});

class MainPage extends Component {
  constructor() {
    super()
    this.sendMessage = this.sendMessage.bind(this);
    this.reconnect = this.reconnect.bind(this);
    this.setSocketHandlers = this.setSocketHandlers.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.state = {
      message: '',
      connection: false,
      socket: '',
    };
  }

  componentDidMount() {
    this.setSocketHandlers();
  }

  reconnect() {
    this.setSocketHandlers();
  }

  setSocketHandlers() {
    const socket = new WebSocket("wss://wssproxy.herokuapp.com/");
    if (socket) {
      this.setState({ socket });
      socket.onopen = () => {
        this.createNotification('success', 'Connection established!');
        this.setState({ connection: true });
      }
      socket.onmessage = (event) => {
        this.createNotification('info', 'There is a new message in the chat!');
        this.props.changeMessages(JSON.parse(event.data));
      }
      socket.onclose = () => {
        this.createNotification('error', 'Please click on this message or on the button on the screen to try connecting again!', this.reconnect);
        this.setState({ connection: false });
      }
    }
  }

  sendMessage(text) {
    const { username } = this.props;
    const message = {
      from: username,
      message: text,
    }
    this.state.socket.send(JSON.stringify(message));
  }

  createNotification(type, text, callback) {
    const title = `Dear ${(this.props.username).toUpperCase()}!`;
    switch (type) {
      case 'info':
        NotificationManager.info(text, title, 3000);
        break;
      case 'success':
        NotificationManager.success(text, '', 5000);
        break;
      case 'warning':
        NotificationManager.warning(text, 3000);
        break;
      case 'error':
        NotificationManager.error(text, 'Connection is broken!', 7000, callback);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="main-page">
        <Header />
        <main>
          {this.state.connection ? (<div></div>) : (<>
            <h3>Connection not established, please click the button to reconnect!</h3>
            <button type="button" onClick={this.reconnect}>{'reconnect'.toUpperCase()}</button>
          </>)}
          <MessageList />
          <SendMessageForm
            sendMessage={this.sendMessage} />
          <NotificationContainer />
        </main>
        <Footer />
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
