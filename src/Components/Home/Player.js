import React, { Component } from "react";
import ReactHowler from "react-howler";
import "./Player.css";
// import MuteButton from "./Controls/MuteButton";
import PlayButton from "./Controls/PlayButton";
// import LoopButton from "./Controls/LoopButton";
import raf from "raf";

import { Grid, Image } from "semantic-ui-react";

/**
 *
 * Presentational component for the audio player for a single sound. This player holds all playback and UI info for the given sound. All interactions and properties of this player will be passed up to the parent component (the HomePage)
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

const host = "https://syro.dannykivi.com";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seek: 0
    };

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.renderSeekPos = this.renderSeekPos.bind(this);
  }

  handleOnPlay() {
    // this.renderSeekPos();
  }

  handleOnLoad() {
    this.props.onLoad(this.player.duration());
  }

  handleOnEnd() {
    this.props.onEnd();
  }

  renderSeekPos() {
    this.setState({
      seek: this.player.seek()
    });

    if (this.props.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  render() {
    return (
      <Grid celled="interally" className="Player">
        <Grid.Column width={4} verticalAlign={"middle"}>
          <Grid centered>
            <Grid.Row className="artistRow">
              <p className="Author">
                {this.props.user.substring(0, this.props.user.indexOf("@"))}
              </p>
            </Grid.Row>

            <Grid.Row className="imageRow">
              <Image className="songImage" src={host + this.props.image} />
            </Grid.Row>

            <Grid.Row className="titleRow">
              <p className="Title">{this.props.title}</p>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column width={10} className={"noLeftRightPadding noBorder"}>
          <img
            src={require("../../Assets/waveform_" + this.props.type + ".svg")}
            className={"wavey"}
          />
          <div
            className={
              "Waveform" + (this.props.playing ? " playing" : " paused")
            }
          >
            <ReactHowler
              src={host + this.props.file}
              onLoad={this.handleOnLoad}
              onPlay={this.handleOnPlay}
              onEnd={this.handleOnEnd}
              playing={this.props.playing}
              loop={this.props.loop}
              mute={this.props.mute}
              volume={this.props.volume}
              ref={ref => (this.player = ref)}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={2} className={"noBorder"} verticalAlign={"middle"}>
          <div className="Controls">
            <PlayButton
              onClick={() => this.props.onToggle()}
              playing={this.props.playing}
              type={this.props.type}
            />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Player;
