import React from "react";
import Header from "./Header";

class NodeProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {nodeUrl: props.nodeUrl};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const nodeUrl = event.target.value;

    this.setState((state, props) => ({
      nodeUrl: nodeUrl
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.nodeUrl);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-signin">
        <Header />
        <p>
          Welcome in a decentralized, p2p eShop interface for selling and purchasing digital content.
        </p>
        <h3 className="h3 mb-3 font-weight-normal">Choose a Leth Node</h3>
        <label htmlFor="provider" className="sr-only">Node HTTP URL</label>
        <input value={this.state.nodeUrl} onChange={this.handleChange} id="provider" className="form-control" placeholder="https://node.sirius.lightstreams.io" required autoFocus />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Enter shop</button>
        <p className="py-4">
          Try also running and connecting to a local node with a localhost url such as: <strong>http://localhost:9091</strong>
          < br/>
          < br/>
          Follow our official <a href="https://docs.lightstreams.network">getting started docs!</a>
        </p>
      </form>
    );
  }
}

export default NodeProvider;
