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
        }
    }

    render(){

        return(
            <div className="Player">
                <button>Play</button>
                <button>Pause</button>

                <ReactHowler
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