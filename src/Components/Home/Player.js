import React, { Component } from "react";
import ReactHowler from "react-howler";
import "./Player.css";
import MuteButton from "./Controls/MuteButton";
import PlayButton from "./Controls/PlayButton";
import LoopButton from "./Controls/LoopButton";

/**
 *
 * Presentational component for the audio player for a single sound. This player holds all playback and UI info for the given sound. All interactions and properties of this player will be passed up to the parent component (the HomePage)
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
//TODO: css here is temporary for testing. Change it

class Player extends Component {
  render() {
    return (
      <div className="Player">
        <h4 className="Title">{this.props.title}</h4>

        <div
          className={"Waveform" + (this.props.playing ? " playing" : " paused")}
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

        <div className="Controls">
          <PlayButton
            onClick={() => this.props.onToggle()}
            playing={this.props.playing}
          />
        </div>
      </div>
    );
  }
}

export default Player;
