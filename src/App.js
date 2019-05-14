import React from 'react';
import './App.css';

import StateNodeProvider from './pages/NodeProvider';
import StateAuth from './pages/Auth';
import Shop from "./pages/Shop";

const stateNameProvider = 'provider';
const stateNameAuth = 'auth';
const stateNameShop = 'shop';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: stateNameShop,
      nodeUrl: "https://localhost:9191",
      account: ""
    };

    this.navigateToAuth = this.navigateToAuth.bind(this);
    this.login = this.login.bind(this);
  }

  navigateToAuth(nodeUrl) {
    this.setState((state, props) => ({
      name: stateNameAuth,
      nodeUrl: nodeUrl,
    }));
  }

  login(account) {
    this.setState((state, props) => ({
      name: stateNameShop,
      account: account,
    }));
  }

  render() {
    if (this.state.name === stateNameProvider) {
      return (
        <StateNodeProvider nodeUrl={this.state.nodeUrl} onSubmit={this.navigateToAuth} />
      );
    }

    if (this.state.name === stateNameAuth) {
      return (
        <StateAuth
          nodeUrl={this.state.nodeUrl}
          onLogin={this.login}
        />
      );
    }

    if (this.state.name === stateNameShop) {
      return (
        <Shop
          nodeUrl={this.state.nodeUrl}
          account={this.state.account}
        />
      );
    }
  }
}

export default App;