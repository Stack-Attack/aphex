import React, {Component} from 'react';
import Player from './Player.js';
import ItemInfo from './ItemInfo.js';
import * as api from "../Sounds.js";


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeID: null,
            activeInfo: null,
            playing: false,
            loop: true,
            playerOutOfFocus: false,
            loadedSounds: []
        };
        this.detectViewPort = this.detectViewPort.bind(this);
    }

    componentDidMount() {
        this.getSingle();
        window.addEventListener("scroll", this.detectViewPort);
    }

    componentWillUnmount() {
        //  window.removeEventListener("scroll", this.handleScroll);
    }

    detectViewPort() {
        if (this.state.activeID != null) {
            let currentElement = document.getElementById("entry_" + this.state.activeID);
            let rect = currentElement.getBoundingClientRect();
            // console.log(rect);
            if (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
            ) {
                this.setState({
                    playerOutOfFocus: false
                })

            } else {
                console.log("out of focus");
                this.setState({
                    playerOutOfFocus: true
                })
            }
        }

    }

    playerToggle(entry) {
        let startPlaying;
        //if user has selected new sound to toggle, immediately start playing it
        if (this.state.activeID != entry.id) {
            startPlaying = true;
            this.setState({
                playerOutOfFocus: false
            });

        }
        else {
            startPlaying = !this.state.playing;
        }

        this.setState({
            activeID: entry.id,
            activeInfo: entry,
            playing: startPlaying
        });
    }

    onPlayerStart(entry) {
        this.setState({
            playing: true
        })
    }

    getSingle() {
        let newContent = api.get();
        this.setState({
            loadedSounds: this.state.loadedSounds.concat(newContent)
        });
    }

    getMultiple() {
        //retrieve new set of sounds from server and append them to the existing array of sounds
        let newArray = [];

        api.getSounds().map((entry) => {
            newArray.push(entry);
        });

        this.setState({
            loadedSounds: this.state.loadedSounds.concat(newArray)
        })
    }

    render() {
        let content;
        if (this.state.loadedSounds) {
             content = this.state.loadedSounds.map((entry) => {
                return (
                    <li key={entry.id} id={"entry_" + entry.id}>
                        <Player
                            title={entry.title}
                            file={entry.file}
                            playing={this.state.playing && this.state.activeID == entry.id}
                            loop={this.state.loop}
                            onToggle={() => this.playerToggle(entry)}
                            onPlay={() => this.onPlayerStart(entry)}
                            onEnd={() => this.onPlayerEnd(entry)}
                            onLoad={() => this.playerLoaded(entry)}
                        />
                    </li>
                );
            });
        }
        else{
            content = "Unable to load sounds"
        }

        return (
            <div>
                <div className="left-pane">
                    <ul>
                        {content}
                    </ul>
                    <div>
                        <button onClick={() => this.getMultiple()}>
                            Get more sounds
                        </button>
                    </div>
                </div>
                <div className="right-pane">
                    <ItemInfo
                        onToggle={id => this.playerToggle(id)}
                        playing={this.state.playing}
                        data={this.state.activeInfo}
                        displayControls={this.state.playerOutOfFocus}/>
                </div>


            </div>
        );
    }


    //we may not even end up needed the three below handlers


    onPlayerEnd(entry) {
        this.setState({
            playing: false
        })
    }

    playerLoaded(entry) {
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;


        if (windowBottom >= docHeight) {
            this.setState({
                message: 'bottom reached'
            });
        } else {
            this.setState({
                message: 'not at bottom'
            });
        }
    }



}

export default Home;
