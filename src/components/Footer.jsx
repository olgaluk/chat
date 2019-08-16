import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {

  render() {
    return (
      <footer>
        <p>BY VOLHA LUKYANENKA</p>
        <div className="contact">
          <span>Address: Belarus, Gomel</span>
          <br />
          <span>GitHub: olgaluk</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
