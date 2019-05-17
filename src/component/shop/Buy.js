import React from "react";

class BuyItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ""
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePasswordChange(event) {
    const password = event.target.value;

    this.setState((state, props) => ({
      password: password
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    window.$("#buyItem"+this.props.acl).modal('toggle');

    this.props.onBuy(this.props.shopAddr, this.props.account, this.state.password, this.props.acl);
  }

  render() {
    return (
      <div className="modal fade" id={"buyItem"+this.props.acl} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Buy digital content</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-left">
              <form onSubmit={this.handleSubmit}>
                <h6 className="h6 mb-3 font-weight-normal">Authorize the purchase of <strong>{this.props.name}</strong> for <strong>{this.props.price} PHT</strong> from account <strong>{this.props.account}</strong> with password:</h6>
                <label htmlFor="password" className="sr-only">Authorize the purchase of <strong>{this.props.name}</strong> for <strong>{this.props.price} PHT</strong> from account <strong>{this.props.account}</strong> with password:</label>
                <input value={this.state.password} onChange={this.handlePasswordChange} id="password" refs="password" type="password" className="form-control" required />

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Buy</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyItemModal;