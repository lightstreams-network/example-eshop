import React from "react";

import Shop from "./../component/shop/Shop";
import NewShopModal from "./../component/shop/New";

const lethJs = require('lightstreams-js-sdk');
const Web3 = require('web3');

class ShopUI extends React.Component {
  constructor(props) {
    super(props);

    this.leth = lethJs(props.nodeUrl);
    this.web3 = new Web3(new Web3.providers.HttpProvider(props.nodeUrl));
    this.db = props.db;

    this.state = {
      isLoading: true,
      accountBalance: 0,
      shops: []
    };

    this.refreshShopBalance = this.refreshShopBalance.bind(this);
    this.refreshAccountBalance = this.refreshAccountBalance.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }

  handleCreate(name, description, password) {
    const self = this;

    this.activateLoading();
    this.leth.shop.create(self.props.account, password)
      .then((res) => {
        const newShop = newShopObj(
          self.props.account,
          0,
          res.shop,
          name,
          description,
          []
        );

        self.db.ref('shops/' + newShop.address).set({
          owner: newShop.owner,
          balance: newShop.balance,
          name: newShop.name,
          description: newShop.description,
          items: []
        });

        this.deactivateLoading();
      })
      .catch((e) => {
        alert(e.toString());
      });
  }

  handleSell(shopAddr, account, name, price, file, password) {
    this.activateLoading();

    const self = this;

    const formData = new FormData();
    formData.append('owner', account);
    formData.append('password', password);
    formData.append('file', file);

    fetch(this.props.nodeUrl+"/storage/add", {method: 'POST', body: formData})
      .then(res => {
        const priceWei = self.web3.utils.toWei(price.toString(), 'ether');

        res.json().then(res => {
          const acl = res.acl;
          const meta = res.meta;

          self.leth.shop.sell(shopAddr, account, password, acl, priceWei)
            .then(res => {
              self.db.ref('shops/' + shopAddr + '/items/' + acl).set({
                name: name,
                meta: meta,
                price: priceWei
              });

              self.deactivateLoading();
            })
            .catch((e) => {
              alert(e.toString());
            });
        });
      })
      .catch((e) => {
        alert(e.toString());
      });
  }

  handleBuy(shopAddr, account, password, acl) {
    this.activateLoading();

    const self = this;
    this.leth.shop.buy(shopAddr, account, password, acl)
      .then((res) => {
        if (!res.success) {
          alert(res.error);
        }

        self.deactivateLoading();
      })
      .catch((e) => {
        alert(e.toString());
      });
  }

  refreshAccountBalance(account) {
    const self = this;
    this.leth.wallet.balance(account)
      .then((res) => {
        self.setState((state, props) => ({
          isLoading: false,
          accountBalance: self.web3.utils.fromWei(res.balance, 'ether')
        }));
      })
      .catch((e) => {
        alert(e.toString());
      })
  }

  refreshShopBalance(shop) {
    const self = this;

    this.activateLoading();
    this.leth.wallet.balance(shop.address)
      .then((res) => {
        shop.balance = self.web3.utils.fromWei(res.balance, 'ether');
        self.setState((state, props) => ({
          isLoading: false,
          shop: shop,
        }));
      })
      .catch((e) => {
        alert(e.toString());
      });
  }

  fetchAllShops() {
    const self = this;
    this.db.ref('/shops/').on('value', function(snapshot) {
      let shops = [];
      snapshot.forEach((rowSnapshot) => {
        const shop = rowSnapshot.val();
        const shopAddr = rowSnapshot.key;

        let items = [];
        rowSnapshot.child("items").forEach((rowSnapshot) => {
          const item = rowSnapshot.val();
          const acl = rowSnapshot.key;
          const price = self.web3.utils.fromWei(item.price, 'ether');

          items.push(newItemObj(item.name, item.meta, acl, price));
        });

        const newShop = newShopObj(
          shop.owner,
          shop.balance,
          shopAddr,
          shop.name,
          shop.description,
          items
        );

        shops.push(newShop);
      });

      self.setState((state, props) => ({
        isLoading: false,
        shops: shops
      }));

      self.state.shops.forEach((shop) => {
        self.refreshShopBalance(shop);
      });

      self.refreshAccountBalance(self.props.account);
    });
  }

  activateLoading() {
    this.setState((state, props) => ({
      isLoading: true
    }));
  }

  deactivateLoading() {
    this.setState((state, props) => ({
      isLoading: false
    }));
  }

  componentDidMount() {
    this.fetchAllShops();
    this.refreshAccountBalance(this.props.account);
  }

  render() {
    let Loading = null;
    if (this.state.isLoading) {
      Loading = <div className="d-flex justify-content-center">
        <div className="spinner-border spinner-border-lg text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    }

    const Shops = this.state.shops.map((shop, i) =>
      <Shop
        shop={shop}
        account={this.props.account}
        key={i}
        onRefreshBalance={this.refreshShopBalance}
        onSell={this.handleSell}
        onBuy={this.handleBuy} />
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

        {Loading}

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
              <strong>
                <h3 className="">Lightstreams Shop App</h3>
              </strong>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Shop address" aria-label="Shop address" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Find</button>
              </form>
            </nav>
            <nav className="navbar navbar-extend-sm navbar-light bg-light">
              <div className="text-left">
                  <strong>Node:</strong> {this.props.nodeUrl} <br />
                  <strong>Account:</strong> {this.props.account} <br />
                  <strong>Balance:</strong> {this.props.accountBalance} PHT
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

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

export default ShopUI;