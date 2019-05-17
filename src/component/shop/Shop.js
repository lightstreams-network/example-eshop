import React from "react";

import shopIcon from './../../img/shop-icon.png';
import Items from "./Items";
import SellItemModal from "./Sell";

class Shop extends React.Component {
  constructor(props) {
    super(props);

    this.refreshShopBalance = this.refreshShopBalance.bind(this);
  }

  refreshShopBalance() {
    this.props.onRefreshBalance(this.props.shop);
  }

  render() {
    let SellButton = null;
    if (this.props.shop.owner === this.props.account) {
      SellButton = <button type="button" className="btn btn-md btn-primary mr-3" data-toggle="modal" data-target={"#sellItem"+this.props.shop.address}>Sell content</button>;
    }

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
              {SellButton}
              <button type="button" className="btn btn-md btn-secondary btn-info" onClick={this.refreshShopBalance}>Refresh balance</button>
            </div>
          </div>
        </div>

        <Items items={this.props.shop.items} shopAddr={this.props.shop.address} shopOwner={this.props.shop.owner} account={this.props.account} onBuy={this.props.onBuy} />

        <SellItemModal shopAddr={this.props.shop.address} account={this.props.account} onSell={this.props.onSell} />
      </main>
    );
  }
}

export default Shop;