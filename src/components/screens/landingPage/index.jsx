import React, { Component } from 'react';

import { connect } from 'react-redux';

import { changeUsername, changePage } from '../../../actions/chatActions';

import Header from './Header';
import Footer from '../../Footer';

import './index.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeUsername: (username) => dispatch(changeUsername(username)),
  changePage: (pageName) => dispatch(changePage(pageName)),
});

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.changeName = this.changeName.bind(this);
    this.state = {
      message: '',
      username: '',
    };
  }

  componentDidMount() {
    this.setState({ username: this.props.username });
  }

  changeName = (event) => {
    this.setState({ message: '' });
    this.setState({ username: event.target.value });
  }

  signIn = () => {
    const { username } = this.state;
    const testNameExp = /^[1-9a-zA-Z \s]{3,40}$/;
    const testName = testNameExp.test(username);
    if (!username) {
      this.setState({ message: 'Warning! All fields must be filled.' });
    } else if (!testName) {
      this.setState({ message: 'Warning! Incorrectly filled name field!' });
    } else {
      this.props.changeUsername(username);
      this.props.changePage('main');
    }
  }

  render() {
    return (
      <div className="landing">
        <Header />
        <main className="landing_main">
          <div className="landing_main-star">
            <div></div>
          </div>
          <div className="landing_main-line"></div>
          <div className="landing_main-info">
            <h2>Please enter your name:</h2>
            <h3>{this.state.message}</h3>
            <input
              type="text"
              onChange={this.changeName}
              placeholder="Name"
              value={this.state.username}
            />
            <button type="button" onClick={this.signIn}>Sign in</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
