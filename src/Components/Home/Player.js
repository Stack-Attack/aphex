import React, {Component} from "react";
import ReactHowler from "react-howler";
import "./Player.css";
// import MuteButton from "./Controls/MuteButton";
import PlayButton from "./Controls/PlayButton";
// import LoopButton from "./Controls/LoopButton";

import { Grid, Image } from "semantic-ui-react";
import faker from "faker";

/**
 *
 * Presentational component for the audio player for a single sound. This player holds all playback and UI info for the given sound. All interactions and properties of this player will be passed up to the parent component (the HomePage)
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

const host = 'https://syro.dannykivi.com';

class Player extends Component {
  render() {
    return (
      <Grid celled="internally" className="Player">
        <Grid.Column width={4}>
          <Grid centered>
            <Grid.Row className="artistRow">
              <h4 className="Title">Artist: {this.props.title}</h4>
            </Grid.Row>

            <Grid.Row className="imageRow">
              <Image className="songImage" src={faker.internet.avatar()} />
            </Grid.Row>

            <Grid.Row className="titleRow">
              <h4 className="Title">{this.props.title}</h4>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column width={10}>
          <div
            className={
              "Waveform" + (this.props.playing ? " playing" : " paused")
            }
          >
            <ReactHowler
              //TODO: this src property currently just retrieves a sound file from public/audio
              //The audio filenames correspond to the data retrieved in testData.json
              src={"audio/" + this.props.file}
              onLoad={this.props.onLoad}
              onPlay={this.props.onPlay}
              onEnd={this.props.onEnd}
              playing={this.props.playing}
              loop={this.props.loop}
              mute={this.props.mute}
              volume={this.props.volume}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={2}>
          <div className="Controls">
            <PlayButton
              onClick={() => this.props.onToggle()}
              playing={this.props.playing}
            />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Player;
