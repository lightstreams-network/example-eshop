import React from "react";

import Shop from "./../component/shop/Shop";
import NewShopModal from "./../component/shop/New";

const lethJs = require('lightstreams-js-sdk');

const newItemObj = (name, meta, acl, price) => {
  return {
    name: name,
    meta: meta,
    acl: acl,
    price: price
  }
};

const newShopObj = (owner, balance, address, name, description, items) => {
  return {
    owner: owner,
    balance: balance,
    address: address,
    name: name,
    description: description,
    items: items
  }
};

class ShopUI extends React.Component {
  constructor(props) {
    super(props);

    // this.leth = lethJs(this.props.nodeUrl);
    this.leth = lethJs("https://gateway.sirius.lightstreams.io");

    this.state = {
      accountBalance: 0,
      shops: [
        newShopObj(
          "0xd119b8b038d3a67d34ca1d46e1898881626a082b",
          0,
          "0xffeF98e9de5524Eaf82A8DE88B031160f694a90A",
          "BytePhotography",
          "Decentralized Digital Photography eShop since 2019",
          [
            newItemObj(
              "water_fountain.jpg",
              "QmVCagzAq7YxTJ59SjWxyny8uxRFWyAbi1P3mCtzdCdN4G",
              "0x59181E21AadB9689289C4E4cBBb0f20a68FeBecA",
              1
            )
          ]
        )
      ]
    };

    this.refreshShopBalance = this.refreshShopBalance.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  // handleNewShopChange(event) {
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

  handleCreate(name, description, password) {
    // Perform here the HTTP creation
    const newShop = newShopObj(
      "this.props.account",
      0,
      "0xmynewhttpreturnedaddress",
      name,
      description,
      []
    );

    let shops = this.state.shops;
    shops.push(newShop);

    this.setState((state, props) => ({
      shops: shops
    }));
  }

  refreshShopBalance(shop) {
    const self = this;
    this.leth.wallet.balance(shop.address).then((res) => {
      shop.balance = res.balance;
      self.setState((state, props) => ({
        shop: shop
      }));
    })
  }

  componentDidMount() {
    this.state.shops.forEach((shop) => {
      this.refreshShopBalance(shop);
    });
  }

  render() {
    const Shops = this.state.shops.map((shop, i) =>
      <Shop shop={shop} key={i} onRefreshBalance={this.refreshShopBalance} />
    );

    return (
      <div>
        <Header nodeUrl={this.props.nodeUrl} account={this.props.account} accountBalance={this.state.accountBalance} />

        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-left">
              <div className="btn-group mt-4">
                <button type="button" className="btn btn-md btn-primary" data-toggle="modal" data-target="#newShop">Create a new shop</button>
              </div>
            </div>
          </div>
          <br />
        </div>

        {Shops}

        <NewShopModal onCreate={this.handleCreate} account={this.props.account} />
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
              <strong><span className="navbar-brand">Lightstreams Shop App</span></strong>
              <span className="navbar-brand">Node: {this.props.nodeUrl} <br />Account: {this.props.account} <small>({this.props.accountBalance} PHT)</small></span>
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