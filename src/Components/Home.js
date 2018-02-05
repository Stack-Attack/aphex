import React, {Component} from 'react';
import data from '../Assets/testData.json';
import Player from '../Components/Player.js';

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            loadedSounds: [],
            loadIndex: 0
        }
    }

    componentDidMount(){
        this.getList();
    }

    getList(){
        //TODO: get request to API for songs
    }

    loadData(){
        let index = this.state.loadIndex;
        const newObject = data["sounds"][index];

        this.setState({
           loadedSounds: this.state.loadedSounds.concat(newObject),
            loadIndex: index+1
        });
    }


    render(){
        const d = this.state.loadedSounds;
        const content = d.map((entry) => {
            return(
                <li key={entry.id}>
                    <Player titl={entry.title} file={entry.file}/>
                </li>
            );
        });

        return(
            <div>
                <ul>
                    {content}
                </ul>
                <button onClick={() => this.loadData()}>
                    Load test sound
                </button>
            </div>
        );
    }
}

export default Home;
