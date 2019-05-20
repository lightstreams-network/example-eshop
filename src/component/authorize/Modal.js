import React from "react";

class AuthorizeModal extends React.Component {
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
    window.$("#"+this.props.id).modal('toggle');

    this.props.onAuthorize(this.state.password);
  }

  render() {
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Authorize the activity</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit} className="text-left" id="newShopForm">
                <h6 className="h6 mb-3 font-weight-normal">Password:</h6>
                <label htmlFor="password" className="sr-only">Password:</label>
                <input value={this.state.password} onChange={this.handlePasswordChange} id="password" ref="password" type="password" className="form-control" required />

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Authorize</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthorizeModal;