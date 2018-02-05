import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import User from '../Components/User.js';
import Home from '../Components/Home.js';

class MainSection extends Component {

    render(){
        return(
            <div>
                <Home/>
                <User/>
            </div>
        );
    }



}

export default MainSection;


