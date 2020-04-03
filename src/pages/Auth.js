import React from "react";
import Header from "./Header";

const { Gateway: lethJs } = require('lightstreams-js-sdk');

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.leth = lethJs(props.nodeUrl);

    this.state = {
      loginAccount: "0xd119b8b038d3a67d34ca1d46e1898881626a082b",
      registerPassword: "",
      isRegistering: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLoginAccountChange = this.handleLoginAccountChange.bind(this);
    this.handleRegisterAccountChange = this.handleRegisterAccountChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleLoginAccountChange(event) {
    const account = event.target.value;

    this.setState((state, props) => ({
      loginAccount: account
    }));
  }

  handleRegisterAccountChange(event) {
    const password = event.target.value;

    this.setState((state, props) => ({
      registerPassword: password
    }));
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    this.props.onLogin(this.state.loginAccount);
  }

  handleRegisterSubmit(event) {
    event.preventDefault();

    this.setState((state, props) => ({
      isRegistering: true
    }));

    const self = this;
    this.leth.user.signUp(this.state.registerPassword)
      .then((res) => {
        self.props.onLogin(res.account);
      })
      .catch((e) => {
        alert(e.toString());
      });
  }

  render() {
    let signUpBtn = <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>;
    let isRegisteringMsg = null;

    if (this.state.isRegistering) {
      signUpBtn = null;
      isRegisteringMsg = "Registering an account, please wait...";
    }

    return (
      <div>
        <Header />
        <h3 className="h3 mb-3 font-weight-normal text-info">Node: {this.props.nodeUrl}</h3>

        <form onSubmit={this.handleLoginSubmit} name="form-login" className="form-signin">
          <h3 className="h3 mb-3 font-weight-normal">Existing account?</h3>
          <label htmlFor="login-account" className="">Type your address</label>
          <input value={this.state.loginAccount} onChange={this.handleLoginAccountChange} id="login-account" name="login-account" className="form-control" placeholder="0x..." autoFocus />

          <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        </form>
        or
        <form onSubmit={this.handleRegisterSubmit} name="form-register" className="form-signin">
          <h3 className="h3 mb-3 font-weight-normal">New account?</h3>
          <label htmlFor="register-password" className="">Type your password</label>
          <input value={this.state.registerPassword} type="password" onChange={this.handleRegisterAccountChange} id="register-password" name="register-password" className="form-control" />

          {signUpBtn}
          <p>{isRegisteringMsg}</p>

        </form>
      </div>
    );
  }
}

export default Auth;
