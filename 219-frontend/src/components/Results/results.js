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
      players: [],
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

  componentDidMount() {
    let { location: { players } } = this.props
    this.setState({
      players
    })
  }


  render() {
    const { players } = this.state;
    let keys = Object.keys(players)
    keys.sort((a, b) => players[b].score - players[a].score)
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
                {keys.map((key, i) => {
                  let player = players[key]
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
                    onClick={() => window.location.href = "/"}
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
