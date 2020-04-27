import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Participants from "../Participants/Participants";
import Scenario from "../Scenario/Scenario";
import { Col, Row } from "shards-react";

export default class Main extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Row>
          <Col md="2">
            <Participants />
          </Col>
          <Col md="8">
            <Scenario />
          </Col>
        </Row>
      </>
    );
  }
}
