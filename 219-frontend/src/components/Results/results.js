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
import { ListGroup, ListGroupItem } from "shards-react";
import socketIOClient from "socket.io-client";
import Notifications, { notify } from "react-notify-toast";
import "../Room/room.css";
import img from "../../assets/images/employee1.png";

const ENDPOINT = "http://127.0.0.1:4001";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      joinedRoom: false,
      playerId: null,
      players: [
        {
          name: "Sarang Grover",
          score: 350,
        },
        {
          name: "Atul Gutal",
          score: 300,
        },
        {
          name: "Bhaskar Gurram",
          score: 250,
        },
        {
          name: "Jay Patel",
          score: 200,
        },
      ],
    };
    this.socket = null;
  }

  handleChange = async (e) => {
    await this.setState({
      playerName: e.target.value,
    });
  };

  handleGetPlayersData = (players) => {
    this.setState({
      players,
    });
  };

  handleConnect = () => {
    this.setState({
      playerId: this.socket.id,
    });
  };

  handleGameStarted = () => {
    let { playerId, players } = this.state;
    this.props.history.push({
      pathname: "/quiz",
      socket: this.socket,
      playerId,
      players,
    });
  };

  handleJoinRoom = async (e) => {
    e.preventDefault();
    let { playerName } = this.state;
    if (!playerName) {
      return notify.show("Please enter you name!", "error");
    }
    const socket = socketIOClient(ENDPOINT);
    this.socket = socket;

    socket.on("connect", this.handleConnect);

    this.setState({
      joinedRoom: true,
    });

    socket.emit("changeName", playerName);

    socket.on("playersData", this.handleGetPlayersData);

    socket.on("gameStarted", this.handleGameStarted);
  };

  componentDidMount() {}

  componentWillUnmount() {
    this.socket.off("playersData", this.handleGetPlayersData);
    this.socket.off("connect", this.handleConnect);
    this.socket.off("gameStarted", this.handleGameStarted);
  }

  handleStartGame = () => {
    this.socket.emit("startGame");
  };

  handleChangeName = () => {
    let { playerName } = this.state;
    if (!playerName) {
      return notify.show("Please enter you name!", "error");
    }
    this.socket.emit("changeName", playerName);
  };

  render() {
    const { joinedRoom, players, playerId } = this.state;
    console.log("players", players, joinedRoom);
    return (
      <React.Fragment>
        <div className="resultsbackground" style={{ height: "1000px" }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Row>
            <Col sm="4"></Col>
            <Col sm="4">
              <ListGroup>
                <ListGroupItem
                  style={{ textAlign: "center", fontSize: "28px" }}
                >
                  Leader Board
                </ListGroupItem>
                {this.state.players.map((player,i) => {
                  return (
                    <ListGroupItem key={player.name}
                    style={{}}>
                      <Avatar
                        name={player.name}
                        size={50}
                        round="50px"
                        style={{ marginRight: "20px" }}
                      />{" "}
                      {`${player.name}: ${player.score}`}
                      {i == 0 ? <img src={img} width={80} /> : <span></span>}
                    </ListGroupItem>
                  );
                })}
                <ListGroupItem>
                  <Button
                    theme="success"
                    style={{ marginLeft: "150px" }}
                    onClick={() => this.props.history.push("/")}
                  >
                    Play Again
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
