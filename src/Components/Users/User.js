import React, {Component} from 'react';
import UsersAPI from '../../api/testUsersAPI';

class User extends Component{

    render(){

        const user = UsersAPI.get(parseInt(this.props.match.params.id, 10));

        if(!user){
            return(
              <div>
                  Sorry, that user wasn't found
              </div>
            );
        }

        return(
            <div>
                <h2>{user.name}</h2>
            </div>
        );
    }
}

export default User;