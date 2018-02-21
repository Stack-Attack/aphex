import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Account extends Component{

    static propTypes = {
        userInfo: PropTypes.object.isRequired
    }


    render(){

        console.log(this.props.userInfo);


        return(
            <div>
                <h2>My user account</h2>
            </div>
        )
    }
}

export default Account;