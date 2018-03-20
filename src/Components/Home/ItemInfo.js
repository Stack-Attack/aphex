import React, { Component } from "react";
import Sticky from "react-stickynode";
import "./ItemInfo.css";
import PlayButton from "./Controls/PlayButton";

/**
 * Presentational component for Item Info that is displayed when a sound is playing. This component is positioned adjacent to the list of loaded sounds, and will display info on the currently selected sound
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

class ItemInfo extends Component {
  render() {
    let title = "";
    let fileName = "";
    let id = ""; // eslint-disable-line no-unused-vars

    if (this.props.data) {
      title = this.props.data.title;
      fileName = this.props.data.file;
      id = this.props.data.id;
    }

    return (
      <Sticky>
        <div className={"item-info" + (!this.props.data ? " hidden" : "")}>
          <div className={!this.props.displayControls ? "hidden" : ""}>
            <PlayButton
              onClick={() => this.props.onToggle(this.props.data)}
              playing={this.props.playing}
            />
          </div>

          <h1>{title}</h1>

          <p>{fileName}</p>
        </div>
      </Sticky>
    );
  }
}

export default ItemInfo;
