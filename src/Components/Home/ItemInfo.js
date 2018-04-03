import React, { Component } from "react";
import Sticky from "react-stickynode";
import "./ItemInfo.css";
import "./Player.css";
import PlayButton from "./Controls/PlayButton";

import { Grid, Image } from "semantic-ui-react";
import faker from "faker";
import wave_yellow from "../../assets/wave_small.png";

/**
 * Presentational component for Item Info that is displayed when a sound is playing. This component is positioned adjacent to the list of loaded sounds, and will display info on the currently selected sound
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

class ItemInfo extends Component {
  render() {
    let title = "";
    let createdAt = "";
    let creator = "";

    if (this.props.data) {
      title = this.props.data.name;
      createdAt = this.props.data.createdAt;
      creator = this.props.data.user.email;
    }

    return (
      <Sticky>
        <Grid
          celled="interally"
          className={"PlayerInfo" + (!this.props.data ? " hidden" : "")}
        >
          <Grid.Column width={4}>
            <Grid centered>
              <Grid.Row className="artistRow">
                <p className="Title">{creator}</p>
              </Grid.Row>

              <Grid.Row className="imageRow">
                <Image className="songImage" src={faker.internet.avatar()} />
              </Grid.Row>

              <Grid.Row className="titleRow">
                <p className="Title">{title}</p>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={10} className={"noLeftRightPadding noBorder"}>
            <img
              src={wave_yellow}
              class="wavey"
              alt="FYI, image alt text is required"
            />
            <div
              className={
                "Waveform" + (this.props.playing ? " playing" : " paused")
              }
            />
          </Grid.Column>
          <Grid.Column width={2} className={"noBorder"}>
            <div className={!this.props.displayControls ? "hidden" : ""}>
              <PlayButton
                onClick={() => this.props.onToggle(this.props.data)}
                playing={this.props.playing}
              />
            </div>
          </Grid.Column>
        </Grid>
        <div className={"item-info" + (!this.props.data ? " hidden" : "")}>
          <p className="infoTitle">
            Lorem ipsum description in this area loreum ipsum yea yeah cool song
            its fun to listen to, give it a go
          </p>
          <p className="infoTitle">
            {new Date(createdAt).toString().slice(4, 15)}
          </p>
          <form>
            <input type="text" name="search" placeholder="Write a comment.." />
          </form>
        </div>
      </Sticky>
    );
  }
}

export default ItemInfo;
