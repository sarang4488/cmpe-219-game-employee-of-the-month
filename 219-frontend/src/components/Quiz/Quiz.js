import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Participants from "../Participants/Participants";
import Scenario from "../Scenario/Scenario";
import { Col, Row } from "shards-react";
import "../Landing/landing.css";
import Timer from "../Timer/Timer";

export default class Main extends Component {
  render() {
    return (
      <div className="backgroundImage">
        <Row>
          <Col md="3">
            <h4 style={{ padding: "10px 0 0 10px", color: "white" }}>
              Question 1/5
            </h4>
          </Col>
          <Col md="6" />
          <Col md="3">
            <Timer />
          </Col>
        </Row>

        <Row>
          <Col md="2">
            <Participants />
          </Col>
          <Col md="8">
            <Scenario />
          </Col>
        </Row>
      </div>
    );
  }
}
