//Player component. Will encapsulate all functionality for the player of a single sound
//TODO: css here is temporary for testing. Change it
//TODO: implement other audio player features
//TODO: encapsulate player component in a larger player

import React, {Component} from 'react';
import ReactHowler from 'react-howler';
import './Player.css';
import MuteButton from './Controls/MuteButton';
import PlayButton from './Controls/PlayButton';
import LoopButton from './Controls/LoopButton';

class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            loaded: false,
            loop: false,
            mute: false,
            volume: 1.0
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleOnLoad = this.handleOnLoad.bind(this);
        this.handleOnEnd = this.handleOnEnd.bind(this);
        this.handleOnPlay = this.handleOnPlay.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.renderSeekPos = this.renderSeekPos.bind(this);
        this.handleLoopToggle = this.handleLoopToggle.bind(this);
        this.handleMuteToggle = this.handleMuteToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            playing: !this.state.playing
        });
    }

    handleLoopToggle() {
        this.setState({
            loop: !this.state.loop
        });
    }

    handleMuteToggle() {
        this.setState({
            mute: !this.state.mute
        })
    }


    handleOnLoad() {
        this.setState({
            loaded: true
        })
    }

    handleOnPlay() {
        this.setState({
            playing: true
        })
    }

    handleOnEnd() {
        this.setState({
            playing: false
        })
    }

    handleStop() {
        //handles if stop is invoked. so stop event is fired currently, so won't be called
        this.setState({
            playing: false
        })
    }

    renderSeekPos() {
        //player seeking event implementation here
    }


    render() {

        return (
            <div className="Player">

                <h4 className="Title">
                    {this.props.title}
                </h4>

                <div className={'Waveform' + (this.state.playing ? ' playing' : ' paused')}>
                    <ReactHowler
                        //TODO: this src property currently just retrieves a sound file from public/audio
                        //The audio filenames correspond to the data retrieved in testData.json
                        //Yeah, I know that's janky. We'll implement a better system for testing soon
                        src={'audio/' + this.props.file}
                        onLoad={this.handleOnLoad}
                        onPlay={this.handleOnPlay}
                        onEnd={this.handleOnEnd}
                        playing={this.state.playing}
                        loop={this.state.loop}
                        mute={this.state.mute}
                        volume={this.state.volume}
                    />
                </div>

                <div className="Controls">
                    <MuteButton onClick={this.handleMuteToggle} mute={this.state.mute}/>
                    <PlayButton onClick={this.handleToggle} playing={this.state.playing}/>
                    <LoopButton onClick={this.handleLoopToggle} loop={this.state.loop}/>
                </div>
            </div>

        );
    }
}

export default Player;