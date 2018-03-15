import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import faker from "faker";

import { Menu, Input, Dropdown, Icon, Image } from "semantic-ui-react";

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

    return (
      <Menu fixed="top" inverted size="huge" color="blue">
        <Menu.Item>
          <Link to="/">APHEX(home)</Link>
        </Menu.Item>

        <Menu.Item>
          <Input placeholder="Search..." />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item color="blue">
            <Icon name="upload" />
            <Link to="/upload">Upload</Link>
          </Menu.Item>

          <Dropdown item trigger={trigger} pointing="top left" icon={null}>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name="user" />
                <Link className="black" to="/account">
                  Account
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Icon name="settings" />
                <Link className="black" to="/settings">
                  Settings
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                text="Sign out"
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
