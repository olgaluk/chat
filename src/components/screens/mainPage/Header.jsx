import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePage } from '../../../actions/chatActions';

import logo from '../../../image/logoChat.png';

import './Header.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changePage: (pageName) => dispatch(changePage(pageName)),
});

class Header extends Component {

  handlePageChange = () => {
    this.props.changePage('landing');
  }

  render() {
    const { username } = this.props;
    return (
      <header className="main-page_header">
        <div className="main-page_header-logo">
          <img src={logo} alt="logo" />
          <div className="main-page_header-line"></div>
          <h1>{'chat'.toLocaleUpperCase()}</h1>
        </div>
        <div className="main-page_header-nav">
          <p className="main-page_header-account"><i className="fas fa-user-circle"></i><span> {username}</span></p>
          <div className="main-page_header-line"></div>
          <p className="main-page_header-link" onClick={this.handlePageChange.bind(this)}>
            <i className="fas fa-sign-out-alt"></i> {'exit'.toUpperCase()}
          </p>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
