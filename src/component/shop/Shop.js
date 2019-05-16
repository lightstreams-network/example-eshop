import React from "react";

import shopIcon from './../../img/shop-icon.png';
import Items from "./Items";

class Shop extends React.Component {
  constructor(props) {
    super(props);

    this.refreshShopBalance = this.refreshShopBalance.bind(this);
  }

  refreshShopBalance() {
    this.props.onRefreshBalance(this.props.shop);
  }

  render() {
    return (
      <main className="container mt-5">
        <hr />
        <div className="d-flex align-items-center p-3 my-3 bg-purple rounded shadow-sm">
          <img className="mr-3" src={shopIcon} alt="" width="72" height="72" />
          <div className="d-flex text-left justify-content-between align-items-top w-100">
            <div>
              <h4 className="mb-0">{this.props.shop.name} <small>({this.props.shop.balance} PHT)</small></h4>
              <div>{this.props.shop.description}</div>
              <small>{this.props.shop.address}</small>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-md btn-primary mr-3">Sell content</button>
              <button type="button" className="btn btn-md btn-secondary btn-info" onClick={this.refreshShopBalance}>Refresh balance</button>
            </div>
          </div>
        </div>

        <Items items={this.props.shop.items} />
      </main>
    );
  }
}

export default Shop;