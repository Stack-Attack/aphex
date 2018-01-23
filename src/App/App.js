import React, { Component } from 'react';
import logo from '../Assets/logo.svg';
import './App.css';
import data from '../Assets/testData.json';
import Player from '../Components/Player.js';

class App extends Component {
  render() {

    const d = data["sounds"];
    const sounds = d.map((entry) => {
       return(
           <li key={entry.id}>
               <h2>{entry.title}</h2>
               <Player file={entry.file}/>
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
              {sounds}
          </ul>

      </div>



    );
  }
}

export default App;
