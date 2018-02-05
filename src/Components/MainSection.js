import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Users from './Users.js';
import Home from '../Components/Home.js';

class MainSection extends Component {

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/users' component={Users}/>


                </Switch>

            </div>

        );
    }



}

export default MainSection;


