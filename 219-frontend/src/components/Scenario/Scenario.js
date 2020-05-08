import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem, Button, Card } from "shards-react";
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
    let { question, answer, options, showOptions, selectedOption, handleAnswer, image } = this.props
    return (
      <Card style={{padding: "20px 20px", minHeight: ""}}>
        <Row>
          <Col md="4" />
          <Col md="4">
            <img
              src={image}
              className="center"
              style={{width: "300px", height: "200px"}}
            />
          </Col>
          <Col md="4" />
        </Row>
        <Row>
          <Col md="2" />
          <Col md="8">
            <ListGroupItem className="hide">
              <h5 style={{ color: "black" }}>
                {question}
              </h5>
            </ListGroupItem>
            <ul style={{listStyleType: 'none', padding: '0'}}>
              {
                showOptions ?
                  options.map((option, i) => {
                    let theme = "light"
                    if (selectedOption === option) {
                      if (selectedOption === answer) theme = 'success'
                      else theme = 'danger'
                    }
                    return <li>
                      <Button
                        // outline={theme === 'light'}
                        theme={theme}
                        disabled={selectedOption !== null}
                        onClick={() => handleAnswer(option)}
                        style={{ width: '100%', marginBottom: "10px", textAlign: "left" }}
                      >
                        <h6 style={{ color: "black", margin: 0 }}>{option}</h6>
                      </Button>
                    </li>
                  })
                  : null
              }
            </ul>


          </Col>
          <Col md="2" />

        </Row>

      </Card>
    );
  }
}
