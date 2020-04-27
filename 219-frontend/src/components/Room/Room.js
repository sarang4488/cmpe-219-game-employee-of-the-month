import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  FormInput
} from "shards-react";
import Avatar from "react-avatar";
import socketIOClient from "socket.io-client";
import Notifications, { notify } from 'react-notify-toast';
import "./room.css"

const ENDPOINT = "http://127.0.0.1:4001";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      joinedRoom: false,
      playerId: null,
      players: [],
    };
    this.socket = null
  }

  handleChange = async e => {
    await this.setState({
      playerName: e.target.value
    });
  };

  handleGetPlayersData = (players) => {
    this.setState({
      players
    })
  }

  handleConnect = () => {
    this.setState({
      playerId: this.socket.id
    })
  }

  handleGameStarted = () => {
    let { playerId, players } = this.state
    this.props.history.push({
      pathname: '/quiz',
      socket: this.socket,
      playerId,
      players
    })
  }

  handleJoinRoom = async (e) => {
    e.preventDefault();
    let { playerName } = this.state
    if (!playerName) {
      return notify.show('Please enter you name!', 'error');
    }
    const socket = socketIOClient(ENDPOINT);
    this.socket = socket

    socket.on('connect', this.handleConnect)

    this.setState({
      joinedRoom: true,
    })


    socket.emit('changeName', playerName)

    socket.on('playersData', this.handleGetPlayersData)

    socket.on('gameStarted', this.handleGameStarted)

  };

  componentDidMount() { }

  componentWillUnmount() {
    this.socket.off('playersData', this.handleGetPlayersData)
    this.socket.off('connect', this.handleConnect)
    this.socket.off('gameStarted', this.handleGameStarted)
  }

  handleStartGame = () => {
    this.socket.emit("startGame")
  }

  handleChangeName = () => {
    let { playerName } = this.state
    if (!playerName) {
      return notify.show('Please enter you name!', 'error');
    }
    this.socket.emit('changeName', playerName)
  }

  render() {
    const { joinedRoom, players, playerId } = this.state
    console.log('players', players, joinedRoom)
    return (
      <Container
        className="dr-example-container"
        style={{ margin: "0px", padding: "0px" }}
      >
        <Notifications />
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
                onChange={e => this.handleChange(e)}
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
                onClick={!joinedRoom ? this.handleJoinRoom : this.handleChangeName}
              >
                {
                  !joinedRoom ? "Join Room" : "Change Name"
                }

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
                Players already joined room:
              </div>
              <br />
              <Row>
                {Object.keys(players).map(key => {
                  let player = players[key]
                  return (
                    <Col lg="2" key={key} style={{ textAlign: 'center' }}>
                      <Avatar
                        name={player.name}
                        size={100}
                        round="100px"
                      />
                      <h6 style={{ color: "white", marginTop: "5px" }}>
                        {player.name}
                      </h6>
                    </Col>
                  );
                })}
              </Row>

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
                  onClick={this.handleStartGame}
                  style={{ marginLeft: "40px" }}
                  disabled={!Object.keys(players).length || (players && players[playerId] && !players[playerId].leader)}
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
