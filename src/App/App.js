import React, {Component} from 'react';
import logo from '../Assets/logo.svg';
import './App.css';
import data from '../Assets/testData.json';
import Player from '../Components/Player.js';


//TODO: load sounds from REST API along with other pertinent data
//TODO: some kind of procedural loading

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedSounds: [],
            loadIndex: 0
        }
    }

    loadData() {
        //A test function that simulates retrieving a new sound from the server.
        // It just grabs the next object from testData.json

        let index = this.state.loadIndex;
        const newObject = data["sounds"][index];

        this.setState({
            loadedSounds: this.state.loadedSounds.concat(newObject),
            loadIndex: index +1
        });
    }

    render() {

        const d = this.state.loadedSounds;
        const content = d.map((entry) => {
            return (
                <li key={entry.id}>
                    <Player title={entry.title} file={entry.file}/>
                </li>
            );
        });

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Hello, welcome to Aphex.</h1>
                    <h3>Site under construction, please be patient</h3>
                </header>

                <ul>
                    {content}
                </ul>

                <button onClick={() => this.loadData()}>
                    Load sound(testing)
                </button>
            </div>
        );
    }
}

export default App;
