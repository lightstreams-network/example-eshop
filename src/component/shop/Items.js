import React from "react";

class Item extends React.Component {
  render() {
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
            <button type="button" className="btn btn-md btn-primary">Buy</button>
          </div>
          <strong><span className="d-block mt-3">{this.props.item.price} PHT</span></strong>
        </div>
      </div>
    );
  }
}

class Items extends React.Component {
  render() {
    const Items = this.props.items.map((item) =>
      <Item item={item} />
    );

    return (
      <div className="my-3 p-3 bg-white rounded shadow-sm text-left">
        <h6 className="border-bottom border-gray pb-2 mb-0">Commercial content</h6>

        {Items}
      </div>
    );
  }
}

export default Items;