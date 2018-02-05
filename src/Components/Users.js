import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import User from '../Components/User.js';
import UserList from '../Components/UserList.js';


class Users extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/users' component={UserList}/>
                    <Route path='/users/:id' component={User}/>
                </Switch>
            </div>
        )
    }
}

export default Users;