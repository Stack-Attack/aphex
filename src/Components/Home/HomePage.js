import React, {Component} from 'react';
import Player from './Player.js';
import ItemInfo from './ItemInfo.js';
import PropTypes from 'prop-types';


class Home extends Component {

    constructor(props) {
        super(props);
        this.detectViewPort = this.detectViewPort.bind(this);
    }


    static propTypes = {
        activeID: PropTypes.number,
        activeInfo: PropTypes.object,
        loadedSounds: PropTypes.array.isRequired,
        playerToggle: PropTypes.func.isRequired,
        retrieveSounds: PropTypes.func.isRequired,
        playing: PropTypes.bool.isRequired,
        loop: PropTypes.bool.isRequired,

    }

    componentDidMount() {
        this.props.retrieveSounds();
        window.addEventListener("scroll", this.detectViewPort);
    }

    componentWillUnmount() {
        //  window.removeEventListener("scroll", this.handleScroll);
    }

    detectViewPort() {
        if (this.props.activeID != null) {
            let currentElement = document.getElementById("entry_" + this.props.activeID);
            let rect = currentElement.getBoundingClientRect();
            // console.log(rect);
            if (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
            ) {

                this.props.adjustFocus(true);

            } else {
                this.props.adjustFocus(false);
            }
        }

    }
    getSingle() {
        // let newContent = api.get();
        // this.setState({
        //     loadedSounds: this.state.loadedSounds.concat(newContent)
        // });
    }

    getMultiple() {
        //retrieve new set of sounds from server and append them to the existing array of sounds
        // let newArray = [];
        //
        // api.getSounds().map((entry) => {
        //     newArray.push(entry);
        // });
        //
        // this.setState({
        //     loadedSounds: this.state.loadedSounds.concat(newArray)
        // })
    }

    render() {
        let content;
        if (this.props.loadedSounds) {
             content = this.props.loadedSounds.map((entry) => {
                return (
                    <li key={entry.id} id={"entry_" + entry.id}>
                        <Player
                            title={entry.title}
                            file={entry.file}
                            playing={this.props.playing && this.props.activeID == entry.id}
                            loop={this.props.loop}
                            onToggle={() => this.props.playerToggle(entry)}
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
                        onToggle={id => this.props.playerToggle(id)}
                        playing={this.props.playing}
                        data={this.props.activeInfo}
                        displayControls={!this.props.playerInFocus}/>
                </div>


            </div>
        );
    }


    //we may not even end up needed the below functions

    onPlayerStart(entry){

    }

    onPlayerEnd(entry) {

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
