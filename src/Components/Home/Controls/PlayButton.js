import React, { Component } from "react";

import { Button } from "semantic-ui-react";

/**
 * Play button component
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

class PlayButton extends Component {
  render() {
    return (
      <div className={"PlayButton"}>
        <Button
          circular
          icon={this.props.playing ? "pause" : "play"}
          onClick={this.props.onClick}
          color={"blue"}
        />
      </div>
    );
  }
}

export default PlayButton;
