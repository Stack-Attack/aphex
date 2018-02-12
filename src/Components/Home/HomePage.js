import React, {Component} from 'react';
import data from '../../Assets/testData.json';
import Player from './Player.js';
import ItemInfo from './ItemInfo.js';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeID: null,
            activeInfo: null,
            playing: false,
            loop: true,
            loadedSounds: [],
            loadIndex: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        //TODO: http request to get initial set of sounds
        this.getList(3);
    //    window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      //  window.removeEventListener("scroll", this.handleScroll);
    }

    getList(num) {
        //TODO: get request to API for sounds. Possibly a get request for number of sounds?

        let index = this.state.loadIndex;
        const newObject = data["sounds"][index];

        this.setState({
            loadedSounds: this.state.loadedSounds.concat(newObject),
            loadIndex: index + 1
        });
    }


    playerToggle(entry){
        let startPlaying;
        //if user has selected new sound to toggle, immediately start playing it
        if(this.state.activeID != entry.id){
            startPlaying = true;
        }
        else{
            startPlaying = !this.state.playing;
        }

        this.setState({
            activeID: entry.id,
            activeInfo: entry,
            playing: startPlaying
        });
    }

    onPlayerStart(entry){
        this.setState({
            playing: true
        })
    }



    render() {
        const content = this.state.loadedSounds.map((entry) => {
            return (
                <li key={entry.id} >
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

        return (
            <div>
                <div className="newsfeed">
                    <ul>
                        {content}
                    </ul>
                </div>

                <div className={'item-info' + (!this.state.activeInfo ? ' hidden' : '')}>
                    <ItemInfo data={this.state.activeInfo}/>
                </div>

                <div>
                    <button onClick={() => this.getList(1)}>
                        Get more sounds
                    </button>
                </div>
            </div>
        );
    }



    //we may not even end up needed the three below handlers


    onPlayerEnd(entry){
        this.setState({
            playing: false
        })
    }
    playerLoaded(entry){
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
