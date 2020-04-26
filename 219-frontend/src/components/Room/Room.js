import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  FormInput,
} from "shards-react";
import Avatar from "react-avatar";
import "./room.css"

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      players: [
        {
          name: "Sarang Grover",
          score: 0,
        },
        {
          name: "Jay Patel",
          score: 0,
        },
        {
          name: "Bhaskar Gurram",
          score: 0,
        },
        {
          name: "Atul Gutal",
          score: 0,
        },
      ],
    };
  }

  handleChange = async (e) => {
    await this.setState({
      playerName: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    await this.setState({
      players: [
        ...this.state.players,
        { name: this.state.playerName, score: 0 },
      ],
    });
  };

  componentDidMount() {}

  render() {
    return (
      <Container
        className="dr-example-container"
        style={{ margin: "0px", padding: "0px" }}
      >
        <div className="background">
          <Row>
            <Col lg="5"></Col>
            <Col lg="6">
              <div
                style={{ fontSize: "32px", marginTop: "5px", color: "white" }}
              >
                Welcome to the Room
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col lg="4"></Col>
            <div style={{ fontSize: "24px", color: "white" }}>
              Enter your name:
            </div>
            <Col lg="4">
              <FormInput
                placeholder="Name"
                className="mb-2"
                onChange={(e) => this.handleChange(e)}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="6"></Col>
            <Col lg="2">
              {" "}
              <Button
                pill
                style={{ marginTop: "5px" }}
                theme="primary"
                onClick={this.handleSubmit}
              >
                Join Room
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="1" />
            <Col lg="8">
              <div
                style={{ fontSize: "28px", marginTop: "5px", color: "white" }}
              >
                Players already joined:
              </div>
              <br />
              {this.state.players.map((player) => {
                return (
                  <Avatar
                    name={player.name}
                    size={100}
                    round="100px"
                    style={{ marginRight: "20px" }}
                  />
                );
              })}
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="5"></Col>
            <Col>
              {" "}
              <ButtonGroup size="lg">
                <Button
                  theme="success"
                  onClick={() => this.props.history.push("/room")}
                  style={{marginLeft:"40px"}}
                >
                  Start Game
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}
