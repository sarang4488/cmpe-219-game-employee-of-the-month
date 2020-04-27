import React, { Component } from "react";
import { Container, Row, Col, Button } from "shards-react";
import Speech from 'speak-tts'

import "./landing.css";

export default class Main extends Component {
  // constructor() {
  //   <Speech text="Welcome to react speech" />;
  // }

  componentDidMount() {
    const speech = new Speech() // will throw an exception if not browser supported
    if (speech.hasBrowserSupport()) { // returns a boolean
      console.log("speech synthesis supported")
    }
    speech.init().then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data)
      speech.speak({
        text: 'Welcome to Employee of the month. Click play button to start the game',
      })
    }).catch(e => {
      console.error("An error occured while initializing : ", e)
    })
  }

  render() {
    return (
      <Container
        className="dr-example-container"
        style={{ margin: "0px", padding: "0px" }}
      >
        <Row>
          <Col lg="12">
            <div className="backgroundImage" style={{ width: "130%" }}>
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
