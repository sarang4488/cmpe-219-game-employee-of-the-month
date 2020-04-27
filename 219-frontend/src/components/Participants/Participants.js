import React, { Component } from "react";
import { Row, ListGroup, ListGroupItem } from "shards-react";
import Avatar from "react-avatar";
import "../Quiz/Quiz.css";

export default class Participants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      players: [
        {
          name: "Sarang Grover",
          score: 40
        },
        {
          name: "Jay Patel",
          score: 30
        },
        {
          name: "Bhaskar Gurram",
          score: 20
        },
        {
          name: "Atul Gutal",
          score: 10
        }
      ]
    };
  }
  render() {
    return (
      <>
        <ListGroup>
          {this.state.players.map((player, index) => (
            <ListGroupItem key={index} className="hide">
              <Avatar
                name={player.name}
                size={50}
                round="50px"
                style={{ marginRight: "20px" }}
              />{" "}
              {"Points: "}
              {player.score}
            </ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  }
}
