import React from "react";

import Shop from "./../component/shop/Shop";

class ShopUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: [
        {
          owner: "0xd119b8b038d3a67d34ca1d46e1898881626a082b",
          balance: 1000,
          address: "0xffeF98e9de5524Eaf82A8DE88B031160f694a90A",
          name: "BytePhotography",
          description: "Decentralized Digital Photography eShop since 2019",
          items: [
            {
              name: "water_fountain.jpg",
              meta: "QmVCagzAq7YxTJ59SjWxyny8uxRFWyAbi1P3mCtzdCdN4G",
              acl: "0x59181E21AadB9689289C4E4cBBb0f20a68FeBecA",
              price: "1"
            }
          ]
        }
      ]
    };

    // this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    // this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  // handleLoginAccountChange(event) {
  //   this.setState((state, props) => ({
  //     loginAccount: event.target.value
  //   }));
  // }
  //
  // handleLoginSubmit(event) {
  //   this.props.onLogin(this.state.loginAccount);
  //
  //   event.preventDefault();
  // }
  //
  // handleRegisterSubmit(event) {
  //   event.preventDefault();
  // }

  render() {
    const Shops = this.state.shops.map((shop) =>
      <Shop shop={shop} />
    );

    return (
      <div>
        <Header nodeUrl={this.props.nodeUrl} account={this.props.account} accountBalance={this.props.accountBalance} />

        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-left">
              <div className="btn-group mt-4">
                <button type="button" className="btn btn-md btn-primary">Create a new shop</button>
              </div>
            </div>
          </div>
          <br />
        </div>

        {Shops}
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <nav className="navbar navbar-extend-sm navbar-light bg-light">
              <strong><a className="navbar-brand">Lightstreams Shop App</a></strong>
              <a className="navbar-brand">Node: {this.props.nodeUrl} <br />Account: {this.props.account} <small>({this.props.accountBalance} PHT)</small></a>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Shop address" aria-label="Shop address" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Find</button>
              </form>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopUI;