import React, { Component } from 'react';

import { connect } from 'react-redux';

import { setSerializedState } from './actions/chatActions';

import LandingPage from './components/screens/landingPage';
import MainPage from './components/screens/mainPage';

import './App.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setSerializedState: (props) => dispatch(setSerializedState(props)),
});

class App extends Component {

  componentDidMount() {
    const serializedState = localStorage.getItem('props');
    if (serializedState) {
      const props = JSON.parse(serializedState);
      this.props.setSerializedState(props);
    }
  }

  componentDidUpdate() {
    const valueLocalStorage = JSON.stringify(this.props);
    localStorage.setItem('props', valueLocalStorage);
  }

  render() {
    const { page } = this.props;
    const screen = (page === 'landing') ? (<LandingPage />) : (<MainPage />);
    return (
      <div className="App">
        {screen}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
