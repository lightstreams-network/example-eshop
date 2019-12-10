import React from "react";
import logo from './../img/lightstreams_logo.png';

class Header extends React.Component {
  render() {
    return (
      <a href="/">
        <p className="inline-image">
          <img className="mb-4 d-inline" style={{width: "100px"}} src={logo} alt="" />
        </p>
        <h3 className="h3 mb-3 font-weight-normal text-danger">Lightstreams Shop Demo</h3>
      </a>
    );
  }
}

export default Header;
