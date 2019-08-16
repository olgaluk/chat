import React, { Component } from 'react';

import logo from '../../../image/logoChat.png';

class Header extends Component {

  render() {
    return (
      <header className="landing_header">
        <img src={logo} className="landing_header-logo" alt="logo" />
        <div className="landing_header-line"></div>
        <h1>{'chat'.toLocaleUpperCase()}</h1>
        <div className="landing_header-line"></div>
      </header>
    );
  }
}

export default Header;
