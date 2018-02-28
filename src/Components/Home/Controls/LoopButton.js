import React, { Component } from "react";

/**
 * Loop button component
 */

class LoopButton extends Component {
  render() {
    return (
      <div className={"LoopButton"}>
        <button onClick={this.props.onClick}>
          {this.props.loop ? "Unloop" : "Loop"}
        </button>
      </div>
    );
  }
}

export default LoopButton;
