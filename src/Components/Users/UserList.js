import React, {Component} from 'react';
import UsersAPI from '../../api/testUsersAPI';
import {Link} from 'react-router-dom';

class UserList extends Component{


    render(){

        const d = UsersAPI.all();
        const content = d.map((entry) =>{
            return(
                <li key={entry.id}>
                    <Link to={'/users/'+ entry.id}>{entry.name}</Link>
                </li>
            )
        });


        return(
            <div>
                <h2>A full list of users</h2>
                {content}
            </div>
        );
    }
}

export default UserList;