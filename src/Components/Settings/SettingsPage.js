import React, {Component} from "react";
import PropTypes from "prop-types";

import {Grid, Image, Button, Form, Header, Icon, Dropdown} from "semantic-ui-react";


/**
 * Presentational component for the 'Account' Page. In the final build, should display user account info. Currently just displays some basic user info to the console.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
class Account extends Component {

    static propTypes = {
        pictureUpload: PropTypes.func.isRequired,
        userInfo: PropTypes.object.isRequired
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
        let imgPath = 'https://syro.dannykivi.com' + this.props.userInfo.user.picture.path;
        let name = this.props.userInfo.user.email;

        return (
            <Grid className={"Grid Margin"} centered>
                <Grid.Column textAlign={"center"} verticalAlign={"middle"} className={"SettingsColumn"} width={"10"} >
                    <Header className={"PoiretHeader Intro Upload"}> Settings </Header>
                    <Image className={"ProfileImage"} src={imgPath} circular centered/>
                    <Header className={"PoiretHeader Subheading"}>
                        {" "}
                        {this.props.userInfo.user.email.substring(
                        0,
                        this.props.userInfo.user.email.indexOf("@")
                        )}{" "}
                        </Header>
                    <input id="aphexPictureUpload" type="file" ref={ref => (this.fileUpload = ref)}/>
                    <Header className={"PoiretHeader Intro Subtitle"}>Email:</Header>
                    <Header className={"PoiretHeader Subheading"}>{name}</Header>
                    <Header className={"PoiretHeader Intro Subtitle"}>Secret Access Key:</Header>
                    <Header className={"PoiretHeader Subheading lol"}>{this.props.userInfo.accessToken}</Header>
                    <Grid.Row>
                        <Button className={"UploadButton Margin"} inverted icon labelPosition="left" onClick={() => this.handleUpload()}>
                            <Icon name="upload"/>
                            Upload
                        </Button>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
    );
    }
}

export default Account;
