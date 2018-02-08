import React, {Component} from 'react';
import data from '../../Assets/testData.json';
import Player from './Player.js';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedSounds: [],
            loadIndex: 0,
            message: 'not at bottom'
        };
        this.handleScroll = this.handleScroll.bind(this);

    }

    componentDidMount() {
        this.getList();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener("scroll", this.handleScroll);
    }

    getList() {
        //TODO: get request to API for songs
    }

    loadData() {
        //retrieves exactly one song from the test json file
        let index = this.state.loadIndex;
        const newObject = data["sounds"][index];

        this.setState({
            loadedSounds: this.state.loadedSounds.concat(newObject),
            loadIndex: index + 1
        });
    }

    render() {
        const content = this.state.loadedSounds.map((entry) => {
            return (
                <li key={entry.id}>
                    <Player title={entry.title} file={entry.file}/>
                </li>
            );
        });

        return (
            <div>
                <div className="fixedDiv">{this.state.message}</div>
                <div className="scrollDiv"></div>
                <ul>
                    {content}
                </ul>
                <button onClick={() => this.loadData()}>
                    Load test sound
                </button>
            </div>
        );
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
