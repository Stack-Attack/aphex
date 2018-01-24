import React, { Component } from 'react';
import logo from '../Assets/logo.svg';
import './App.css';
import data from '../Assets/testData.json';
import Player from '../Components/Player.js';


//TODO: load sounds from REST API along with other pertinent data
//TODO: some kind of procedural loading

class App extends Component {
  render() {

    const d = data["sounds"];
    const content = d.map((entry) => {
       return(
           //iterate through every player object
           <li key={entry.id}>
               <Player title = {entry.title} file={entry.file}/>
           </li>
       );
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello, welcome to Aphex.</h1>
            <h3>Site under construction, please be patient</h3>
        </header>

          <ul>
              {content}
          </ul>

      </div>



    );
  }
}

export default App;
