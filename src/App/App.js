import React, {Component} from 'react';
import './App.css';
import MainSection from '../Components/MainSection.js';
import Header from '../Components/Header.js';

//TODO: load sounds from REST API along with other pertinent data
//TODO: some kind of procedural loading
//TODO: implement redux state

class App extends Component {

    render() {

        return (
            <div className="App">
                <Header/>
                <MainSection/>
            </div>
        );
    }
}

export default App;
