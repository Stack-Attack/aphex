//Player component. Will encapsulate all functionality for the player of a single sound

import React, {Component} from 'react';
import ReactHowler from 'react-howler';

class Player extends Component{


    constructor(props){
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

    handleToggle(){
        this.setState({
           playing: !this.state.playing
        });
    }

    handleLoopToggle(){
        this.setState({
           loop: !this.state.loop
        });
    }

    handleMuteToggle(){
        this.setState({
            mute: !this.state.mute
        })
    }


    handleOnLoad(){
        //load event implementation here
    }

    handleOnPlay(){
        //play event implementation here
    }

    handleOnEnd(){
        //end event implementation here
    }

    handleStop(){
        //stop event implementation here
    }

    renderSeekPos(){
        //player seeking event implementation here
    }









    render(){

        return(
            <div className="Player">

                <h4 className="status">

                </h4>

                <button onClick={this.handleToggle}>
                    {(this.state.playing) ? 'Pause' : 'Play'}
                </button>
                <button onClick={this.handleLoopToggle}>
                    {(this.state.loop) ?  'Unloop' : 'Loop'}
                </button>
                <button onClick={this.handleMuteToggle}>
                    {(this.state.mute) ? 'Unmute' : 'Mute'}
                </button>

                <ReactHowler
                    //TODO: this src property currently just retrieves a sound file from public/audio
                    //The audio filenames correspond to the data retrieved in testData.json
                    //Yeah, I know that's janky. We'll implement a better system for testing soon
                    src={'audio/' + this.props.file}
                    playing={this.state.playing}
                    loop={this.state.loop}
                    mute={this.state.mute}
                    volume={this.state.volume}
                />

            </div>

        );
    }
}

export default Player;