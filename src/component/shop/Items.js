import React from "react";

import BuyItemModal from "./Buy";
import Authorize from "../authorize/Modal";

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.hasAccess = this.hasAccess.bind(this);
    this.viewFile = this.viewFile.bind(this);
  }

  viewFile(password) {
    this.props.onViewFile(this.props.item.meta, this.props.account, password);
  }

  hasAccess() {
    return this.props.item.buyers.includes(this.props.account)
      || this.props.shopOwner === this.props.account;
  }

  render() {
    let BuyBtn = null;
    let ViewBtn = null;
    let ViewBtnAuthorizeModal = null;

    if (this.hasAccess()) {
      ViewBtn = <button data-toggle="modal" data-target={"#authorizeItemView"+this.props.item.meta} className="btn btn-md btn-success">View</button>;
      ViewBtnAuthorizeModal = <Authorize id={"authorizeItemView"+this.props.item.meta} onAuthorize={this.viewFile} />;
    } else {
      BuyBtn = <button data-toggle="modal" data-target={"#buyItem"+this.props.item.acl} type="button" className="btn btn-md btn-primary">Buy</button>;
    }

    return (
      <div className="media text-muted pt-3">
        <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32"
             xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"
             role="img" aria-label="Placeholder: 32x32"><title>Song Cover</title>
          <rect width="100%" height="100%" fill="#007bff"></rect>
          <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
        </svg>
        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <div className="d-flex justify-content-between align-items-top w-100">
            <div>
              <strong className="text-gray-dark">{this.props.item.name}</strong><br />
              <span>{this.props.item.meta}</span>
            </div>
            {BuyBtn}
            {ViewBtn}
            {ViewBtnAuthorizeModal}
          </div>
          <strong><span className="d-block mt-3">{this.props.item.price} PHT</span></strong>
        </div>
      </div>
    );
  }
}

class Items extends React.Component {
  render() {
    const Items = this.props.items.map((item, i) =>
      <div key={i}>
        <Item item={item} account={this.props.account} shopOwner={this.props.shopOwner} onViewFile={this.props.onViewFile} />
        <BuyItemModal shopAddr={this.props.shopAddr} account={this.props.account} name={item.name} acl={item.acl} price={item.price} onBuy={this.props.onBuy} />
      </div>
    );

    return (
      <div className="my-3 p-3 bg-white rounded shadow-sm text-left">
        <h5 className="border-bottom border-gray pb-2 mb-0">Commercial content:</h5>

        {Items}
      </div>
    );
  }
}

export default Items;