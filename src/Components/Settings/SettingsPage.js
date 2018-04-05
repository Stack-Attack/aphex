import React, {Component} from "react";
import PropTypes from "prop-types";

import {Menu, Input, Dropdown, Icon, Image, Button} from "semantic-ui-react";


/**
 * Presentational component for the 'Account' Page. In the final build, should display user account info. Currently just displays some basic user info to the console.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
class Account extends Component {

    static propTypes = {
        pictureUpload: PropTypes.func.isRequired
    }


    handleUpload(){
        const file = this.fileUpload.files[0];
        let url = '';

        let reader =new FileReader();

        reader.onload = e => {
            url = reader.result;
            let payload = {
                url: url
            };
            this.props.pictureUpload(payload);
        }

        if(file){
            reader.readAsDataURL(file);
        }
    }

    render() {

        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <h2>Profile picture</h2>
                <input id="aphexPictureUpload" type="file" ref={ref => (this.fileUpload = ref)}/>
                <button onClick={() => this.handleUpload()}>Upload</button>
            </div>
    );
    }
}

export default Account;
