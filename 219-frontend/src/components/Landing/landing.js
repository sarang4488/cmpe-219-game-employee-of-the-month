import React, { Component } from "react";
import { Container, Row, Col, Button } from "shards-react";
// import Speech from "react-speech";

import "./landing.css";

export default class Main extends Component {
  // constructor() {
  //   <Speech text="Welcome to react speech" />;
  // }

  // componentDidMount() {
  //   <Speech text="Welcome to react speech" />;
  // }

  render() {
    return (
      <Container
        className="dr-example-container"
        style={{ margin: "0px", padding: "0px" }}
      >
        <Row>
          <Col lg="12">
            <div className="backgroundImage">
              <h4 className="introduction" style={{ fontSize: "40px" }}>
                Welcome to Employee of the month
              </h4>
              <Button
                pill
                theme="success"
                className="playButton"
                onClick={() => this.props.history.push("/room")}
              >
                Play
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
