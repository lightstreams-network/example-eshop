import React from "react";

import shopIcon from './../../img/shop-icon.png';
import Items from "./Items";

class Shop extends React.Component {
  render() {
    return (
      <main className="container">
        <div className="d-flex align-items-center p-3 my-3 bg-purple rounded shadow-sm">
          <img className="mr-3" src={shopIcon} alt="" width="72" height="72" />
          <div className="d-flex justify-content-between align-items-top w-100">
            <div>
              <h5 className="mb-0">{this.props.shop.name} <small>({this.props.shop.balance} PHT)</small></h5>
              <div>{this.props.shop.description}</div>
              <small>{this.props.shop.address}</small>
            </div>
            <button type="button" className="btn btn-md btn-secondary">Sell content</button>
          </div>
        </div>

        <Items items={this.props.shop.items} />
      </main>
    );
  }
}

export default Shop;