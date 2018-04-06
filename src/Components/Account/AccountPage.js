import React, {Component} from "react";
import PropTypes from "prop-types";

import {Menu, Input, Dropdown, Icon, Image, Button} from "semantic-ui-react";


/**
 * Presentational component for the 'Account' Page. In the final build, should display user account info. Currently just displays some basic user info to the console.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
class Account extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired
    };


    render() {
        //currently just displays some user info passed to this component via props
        console.log(this.props.userInfo);

        let content;

        if (this.props.userInfo != null) {
            content = (
                <div>
                    <Image
                        avatar src={'https://syro.dannykivi.com' + this.props.userInfo.user.picture.path}
                    />
                    <h2>Email: {this.props.userInfo.user.email}</h2>
                </div>
            )
        }
        else{
            content = (
                <div>
                    Unable to load account info.
                </div>
            )
        }

        return (
            <div>
                <h2>My user account</h2>
                {content}
            </div>

    );
    }
}

export default Account;
