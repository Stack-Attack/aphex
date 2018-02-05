import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Users from './Users.js';
import Home from './Home.js';
import Login from './Login.js';

class MainSection extends Component {

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/users' component={Users}/>
                    <Route exact path='/login' component={Login}/>
                </Switch>

            </div>

        );
    }



}

export default MainSection;


