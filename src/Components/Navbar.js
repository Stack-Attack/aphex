import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import faker from "faker";

import { Menu, Input, Dropdown, Icon, Image, Button } from "semantic-ui-react";

/**
 * Presentational component for the navbar of the application. Displays the correct information to the user based on whether they have authentication.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

class Navbar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logoutClicked: PropTypes.func.isRequired
  };

  render() {
    let content = null;

    if (this.props.isAuthenticated) {
      content = (
        <button onClick={() => this.props.logoutClicked}>Sign Out</button>
      );
    } else {
      content = <Link to="/login">Sign In</Link>;
    }

    const trigger = (
      <span>
        <Image avatar src={faker.internet.avatar()} /> {faker.name.findName()}
      </span>
    );

    const logo = require("../assets/logoDece.svg");

    return (
      <Menu fixed="top" inverted size="huge" color="blue">
        <Menu.Item>
          <Link to="/">
            <Image src={logo} size="small" />
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Input placeholder="Search..." />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/upload">
              <Button inverted icon labelPosition="left">
                <Icon name="upload" />
                Upload
              </Button>
            </Link>
          </Menu.Item>

          <Dropdown item trigger={trigger} pointing="top left" icon={null}>
            <Dropdown.Menu>
              <Link to="/account">
                <Dropdown.Item
                  className="black hoverClick"
                  text="&nbsp;&nbsp;Account"
                  icon="user"
                />
              </Link>

              <Link to="/settings">
                <Dropdown.Item
                  className="black hoverClick"
                  text="&nbsp;&nbsp;Settings"
                  icon="settings"
                />
              </Link>

              <Dropdown.Item
                text="Sign Out"
                icon="sign out"
                onClick={() => this.props.logoutClicked}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
export default Navbar;
