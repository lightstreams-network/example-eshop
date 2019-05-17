import React from "react";

class SellItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: 15,
      file: null,
      password: "",
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const name = event.target.value;

    this.setState((state, props) => ({
      name: name
    }));
  }

  handlePriceChange(event) {
    const price = event.target.value;

    this.setState((state, props) => ({
      price: price
    }));
  }

  handleFileChange(event) {
    const file = event.target.files[0];

    this.setState((state, props) => ({
      file: file
    }));
  }

  handlePasswordChange(event) {
    const password = event.target.value;

    this.setState((state, props) => ({
      password: password
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    window.$("#sellItem"+this.props.shopAddr).modal('toggle');

    this.props.onSell(this.props.shopAddr, this.props.account, this.state.name, this.state.price, this.state.file, this.state.password);
  }

  render() {
    return (
      <div className="modal fade" id={"sellItem"+this.props.shopAddr} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Sell your digital content</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-left">
              <form onSubmit={this.handleSubmit}>
                <h6 className="h6 mb-3 font-weight-normal">Item name</h6>
                <label htmlFor="name" className="sr-only">Item name</label>
                <input value={this.state.name} onChange={this.handleNameChange} id="name" refs="name" className="form-control" placeholder="Game of Thrones Trailer" required autoFocus />

                <hr />

                <h6 className="h6 mb-3 font-weight-normal">Selling price in PHTs</h6>
                <label htmlFor="name" className="sr-only">Selling price in PHTs</label>
                <input value={this.state.price} onChange={this.handlePriceChange} type="number" id="price" refs="price" className="form-control" placeholder="5" required />

                <hr />

                <h6 className="h6 mb-3 font-weight-normal">Select file to sell</h6>
                <label htmlFor="name" className="sr-only">Select file to sell</label>
                <input onChange={this.handleFileChange} type="file" refs="file" className="form-control" />

                <hr />

                <h6 className="h6 mb-3 font-weight-normal">Authorize the sell activity from account <strong>{this.props.account}</strong> with password:</h6>
                <label htmlFor="password" className="sr-only">Authorize the sell activity from account <strong>{this.props.account}</strong> with password:</label>
                <input value={this.state.password} onChange={this.handlePasswordChange} id="password" refs="password" type="password" className="form-control" required />

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Sell</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SellItemModal;