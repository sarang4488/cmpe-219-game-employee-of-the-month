import React from 'react';
import Speech from 'speak-tts'
import { Row, Col } from "shards-react";
import Timer from "../Timer/Timer";
import Participants from "../Participants/Participants";
import Scenario from "../Scenario/Scenario";

class Quiz extends React.Component {

  state = {
    timer: 0,
    quizQuestions: [
      {
        question: "Name the three countries in the world that begin with the letter F",
        options: ['o1', 'o2', 'o3', 'o4'],
        answer: 'o1'
      },
      {
        question: "What is the longest river in Britain?",
        options: ['o1', 'o2', 'o3', 'o4'],
        answer: 'o2'
      },
      {
        question: "What city has the busiest airport in the world?",
        options: ['o1', 'o2', 'o3', 'o4'],
        answer: 'o3'
      }
    ],
    curQuestionIdx: 0,
    selectedOption: null,
    players: {}
  }

  startQuestion = () => {
    console.log("hello")
    let { quizQuestions, curQuestionIdx, timer } = this.state
    this.speech.speak({
      text: quizQuestions[curQuestionIdx].question,
      listeners: {
        onend: () => {
          this.setState({
            showOptions: true
          })
          this.timerInterval = setInterval(() => {
            console.log("timer")
            let { timer, curQuestionIdx, quizQuestions, players, playerId } = this.state
            if (timer === 10) { // timer ends
              clearInterval(this.timerInterval)
              if (curQuestionIdx === quizQuestions.length - 1) {
                // go to results page
                this.props.history.push({
                  pathname: '/results',
                  socket: this.socket,
                  playerId,
                  players
                })
                return
              }
              this.setState({
                timer: 0,
                curQuestionIdx: curQuestionIdx + 1,
                showOptions: false,
                selectedOption: null
              })
              this.startQuestion()
              return
            }
            this.setState({
              timer: this.state.timer + 1
            })

          }, 1000)
        }
      }
    })
  }

  handleGetPlayersData = (players) => {
    console.log("players", players)
    this.setState({
      players
    })
  }

  componentDidMount() {
    console.log(this.props)
    let { location: { socket, playerId, players } } = this.props
    this.socket = socket

    socket.on('playersData', this.handleGetPlayersData)

    this.setState({
      playerId,
      players
    })

    const speech = new Speech()
    this.speech = speech
    speech.init().then((data) => {
      setTimeout(() => {
        this.startQuestion()
      }, 1000)

    })
  }


  handleAnswer = (option) => {
    let { quizQuestions, curQuestionIdx, timer, selectedOption } = this.state
    if (selectedOption !== null) return
    this.setState({ selectedOption: option }, () => {
      if (option === quizQuestions[curQuestionIdx].answer) {
        this.socket.emit('updateScore', (30 - timer) * 10)
        this.speech.speak({
          text: "Right Answer"
        })
      } else {
        this.speech.speak({
          text: "Wrong Answer"
        })
      }
    })

  }

  componentWillUnmount() {
    this.socket.off('playersData', this.handleGetPlayersData)
  }

  render() {
    const { quizQuestions, curQuestionIdx, timer, showOptions, selectedOption, players } = this.state
    let curQuestion = quizQuestions[curQuestionIdx]
    let { question, options, answer } = curQuestion
    return (
      <div className="backgroundImage">
        <Row>
          <Col md="3">
            <h4 style={{ padding: "10px 0 0 10px", color: "white" }}>
              Question {curQuestionIdx + 1}/{quizQuestions.length}
            </h4>
          </Col>
          <Col md="6" />
          <Col md="3">
            <Timer timer={timer} />
          </Col>
        </Row>
        <Row>
          <Col md="2">
            <Participants players={players} />
          </Col>
          <Col md="8">
            <Scenario
              question={question}
              showOptions={showOptions}
              answer={answer}
              selectedOption={selectedOption}
              options={options}
              handleAnswer={this.handleAnswer}

            />
          </Col>
        </Row>
      </div>

    )
  }
}

export default Quiz