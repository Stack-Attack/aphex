import React, { Component } from "react";

/**
 * Play button component
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

class PlayButton extends Component {
  render() {
    return (
      <div className={"PlayButton"}>
        <button onClick={this.props.onClick}>
          {this.props.playing ? "Pause" : "Play"}
        </button>
      </div>
    );
  }
}

export default PlayButton;
