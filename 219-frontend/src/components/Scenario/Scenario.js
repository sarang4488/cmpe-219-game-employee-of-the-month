import React, { Component } from "react";
import { Row, Col } from "shards-react";

export default class Participants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Scenarios: [
        {
          name: "Scenario1"
        },
        {
          name: "Scenario2"
        }
      ]
    };
  }

  render() {
    return (
      <>
        <Row>
          <Col md="4" />
          <Col md="4">
            <img
              src={require("../../assets/images/newProduct.jpeg")}
              class="center"
            />
          </Col>
          <Col md="4" />
        </Row>
        <Row>
          <Col md="2" />
          <Col md="8">
            <text>
              The company is launching a new internal product which will let
              employees log into the company portal from home and let them work
              on a secure network?
            </text>
          </Col>
          <Col md="2" />
        </Row>
      </>
    );
  }
}
