import React from 'react';
import Speech from 'speak-tts'
import { Row, Col } from "shards-react";
import Timer from "../Timer/Timer";
import Participants from "../Participants/Participants";
import Scenario from "../Scenario/Scenario";

import launch from "../../assets/images/launch.png";
import install from "../../assets/images/install.jpg";
import network from "../../assets/images/network.png";
import phishing from '../../assets/images/phishing.png';
import data from '../../assets/images/data.png';
import friend from '../../assets/images/friend.png';

class Quiz extends React.Component {

  state = {
    timer: 20,
    // quizQuestions: [{
    //   question: "abc",
    //   options: ['Multi factor authentication', 'HTTP Basic Authentication', 'Biometrics Authentication', 'OAuth Authentication'],
    //   answer: 'Multi factor authentication',
    //   image: launch
    // },],
    quizQuestions: [
      {
        question: "Your company is  planning to launch a new product, Which authentication protocol should you implement?",
        options: ['Multi factor authentication', 'HTTP Basic Authentication', 'Biometrics Authentication', 'OAuth Authentication'],
        answer: 'Multi factor authentication',
        image: launch
      },
      {
        question: "You are trying to install software on your office computer, but the antivirus is blocking your installation. What you should do?",
        options: ['You need to contact your IT help desk or Information Security team.', 'Try to disable Antivirus  and install the software.', 'Look for alternatives to the software or contact your manager.', 'None of the above'],
        answer: 'You need to contact your IT help desk or Information Security team.',
        image: install
      },
      {
        question: "You have opened  an email originated outside the company’s network containing a web link and now your computer is behaving strangely. What course of action should you take next?",
        options: ['The purpose of a firewall and security software is to block malicious code getting into your computer in the first place so no action is needed.', 'You need to update and run your antivirus software.', 'You need to contact your IT help desk or Information Security team.', 'Keep an eye on the performance of your computer.'],
        answer: 'You need to contact your IT help desk or Information Security team.',
        image: network
      },
      {
        question: "you have received an email from a person stating to be from your client. Best way to validate whether it is a legitimate email or a phishing email?",
        options: ['Bad spelling, poor syntax, and grammar are one of the tell-tale signs of a fake email.', 'Look at the email headers to see where it really came from.', 'Look for poorly replicated logos.', 'Contact the sender on some other medium besides email to verify whether they sent you the email.'],
        answer: 'Contact the sender on some other medium besides email to verify whether they sent you the email.',
        image: phishing
      },
      {
        question: "You are in a cafe, doing office work. What steps do you need to take to protect data?",
        options: ['Connect to companies VPN.', 'Always make sure that no one is looking at your computer screen while youre typing passwords.', 'All of the above', 'None of the above'],
        answer: 'All of the above',
        image: data
      },
      {
        question: "You have a friend who's visiting your company as a visitor, he asks you for wifi password?",
        options: ['You should allow your friend to access the company’s network, as you know him.', 'Say no, as company privacy is more important.', "Contact the front desk and try to get access to the company's guest Wifi.", 'None of the above'],
        answer: "Contact the front desk and try to get access to the company's guest Wifi.",
        image: friend
      },
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
            if (timer === 0) { // timer ends
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
                timer: 20,
                curQuestionIdx: curQuestionIdx + 1,
                showOptions: false,
                selectedOption: null
              })
              this.startQuestion()
              return
            }
            this.setState({
              timer: this.state.timer - 1
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
        this.socket.emit('updateScore', (timer) * 10)
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
    let { question, options, answer, image } = curQuestion
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
              image={image}
            />
          </Col>
        </Row>
      </div>

    )
  }
}

export default Quiz
