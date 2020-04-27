import React, { Component } from "react";

export default class Timer extends Component {

  render() {
    let { timer } = this.props
    return (
      <div>
        <h4 style={{ color: "white", marginTop: "10px" }}>
          Time Remaining: {30 - timer}
        </h4>
      </div>
    );
  }
}
