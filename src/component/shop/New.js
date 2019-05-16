import React from "react";

class NewShopModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      password: "",
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const name = event.target.value;

    this.setState((state, props) => ({
      name: name
    }));
  }

  handleDescriptionChange(event) {
    const description = event.target.value;

    this.setState((state, props) => ({
      description: description
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
    window.$("#newShop").modal('toggle');

    this.props.onCreate(this.state.name, this.state.description, this.state.password);
  }

  render() {
    return (
      <div className="modal fade" id="newShop" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Create your new digital shop</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit} className="text-left" id="newShopForm">
                <h6 className="h6 mb-3 font-weight-normal">What should be the shop name?</h6>
                <label htmlFor="name" className="sr-only">What should be the shop name?</label>
                <input value={this.state.name} onChange={this.handleNameChange} id="name" refs="name" className="form-control" placeholder="ArmanaMusic" required autoFocus />

                <hr />

                <h6 className="h6 mb-3 font-weight-normal">How would you describe your shop?</h6>
                <label htmlFor="description" className="sr-only">How would you describe your shop?</label>
                <input value={this.state.description} onChange={this.handleDescriptionChange} id="description" refs="description" className="form-control" placeholder="First decentralized eShop for selling and purchasing music." required />
                <hr />

                <h6 className="h6 mb-3 font-weight-normal">Authorize the shop creation from account <strong>{this.props.account}</strong> with password:</h6>
                <label htmlFor="password" className="sr-only">Authorize the shop creation from account <strong>{this.props.account}</strong> with password:</label>
                <input value={this.state.password} onChange={this.handlePasswordChange} id="password" refs="password" type="password" className="form-control" required />

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewShopModal;