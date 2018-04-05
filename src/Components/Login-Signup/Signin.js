import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Signin.css";

/**
 * Presentational component for the Signin/Login page. Will send signin credentials up to the parent component.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

import {Grid, Image, Button, Form, Header} from "semantic-ui-react";


class Signin extends Component {
    state = {
        email: '',
        password: ''
    }

    static propTypes = {
        loginClicked: PropTypes.func.isRequired,
        signupClicked: PropTypes.func.isRequired,
        errorMessage: PropTypes.string
    };

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value})
    }

    handleLogin = () => {
        this.props.loginClicked(this.state);
    }

    handleSignup = () => {

        let creds = {};

        //no profile picture selected
        creds = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.signupClicked(creds);
    }

    render() {
        const {email, password} = this.state

        const logo = require("../../Assets/syro_logo_white.svg");


        return (

            <Grid stackable className={"Grid"} verticalAlign={"middle"}>
                <Grid.Row columns={2} centered style={{paddingBottom: '0', paddingTop: '0'}}>
                    <Grid.Column centered className={"LeftSide"} verticalAlign={"middle"}>
                        <Grid.Row verticalAlign={"middle"}>
                            <Image className={"Logo"} size={"medium"} verticalAlign={"middle"} src={logo}/>
                        </Grid.Row>
                        <Grid.Row textAlign={"center"}>
                            <Header className={"PoiretHeader Intro"}>
                                A space for artists to share their unfiltered sounds under 60 seconds.
                            </Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Form>
                                <Form.Field>
                                    <Button className={"Button Sample"} toggle circular>samples</Button>
                                </Form.Field>
                                <Form.Field>
                                    <Button className={"Button Demo"} toggle circular>demos</Button>
                                </Form.Field>
                                <Form.Field>
                                    <Button className={"Button Preview"} toggle circular>previews</Button>
                                </Form.Field>
                            </Form>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column verticalAlign={"middle"}>
                        <Grid.Row columns={2} className={"RightSide"}>
                            <Grid.Column>
                                <Form className={"Form"}>
                                    <Header className={"PoiretHeader Login"} textAlign={"center"}>start
                                        sharing.</Header>
                                    <Header className={"PoiretHeader Login Bottom"} textAlign={"center"}>start
                                        discovering.</Header>
                                    <div className={"Test"}>
                                        <Button className={"Button Register"} circular inverted color={"green"} basic
                                                onClick={this.handleSignup}>register</Button>
                                    </div>
                                    <Form.Field fluid className={"FormEntry Top"}>
                                        <Form.Input type={"text"} name='email' value={email} placeholder={"email"}
                                                    onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Form.Field fluid className={"FormEntry"}>
                                        <Form.Input type={"password"} name='password' value={password}
                                                    placeholder={"password"} onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Form.Button className={"FormButton"} onClick={this.handleLogin}>Login</Form.Button>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>

            </Grid>




        );
    }
}

export default Signin;
