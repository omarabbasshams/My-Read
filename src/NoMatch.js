import React, { Component } from "react";
import { Link } from "react-router-dom";

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <h1 style={{ textAlign: "center" }}> Page 404</h1>
      </div>
    );
  }
}

export default NoMatch;
