import React, { Component } from "react";
import Timer from "../Timer/Timer";
import { Navbar, Nav, NavItem, Collapse } from "shards-react";
import "../Quiz/Quiz.css";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    let { timer } = this.props
    return (
      <>
        <Navbar type="dark" theme="primary" expand="md">
          <Collapse open={this.state.collapseOpen} navbar>
            <Nav navbar className="ml-auto">
              <NavItem>
                <Timer timer={timer} />
                {""}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}
