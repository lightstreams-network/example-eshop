import React from "react";
import logo from './../img/ls_logo.png';

class Header extends React.Component {
  render() {
    return (
      <a href="/">
        <p>
          <img className="mb-4" src={logo} alt="" />
        </p>
        <h1 className="h1 mb-3 font-weight-normal text-danger">Shop</h1>
      </a>
    );
  }
}

export default Header;