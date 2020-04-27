import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "shards-react";
import "./Scenario.css";
import "../Quiz/Quiz.css";

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
            <ListGroup>
              <ListGroupItem className="hide">
                <h5 style={{ color: "white" }}>
                  1. The company is launching a new internal product which will
                  let employees log into the company portal from home and let
                  them work on a secure network?
                </h5>
              </ListGroupItem>
              <ListGroupItem className="hide">
                <h5 style={{ color: "white" }}>option 1</h5>
              </ListGroupItem>
              <ListGroupItem className="hide">
                <h5 style={{ color: "white" }}>option 2</h5>
              </ListGroupItem>
              <ListGroupItem className="hide">
                <h5 style={{ color: "white" }}>option 3</h5>
              </ListGroupItem>
              <ListGroupItem className="hide">
                <h5 style={{ color: "white" }}>option 4</h5>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md="2" />
        </Row>
      </>
    );
  }
}
