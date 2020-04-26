import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/landing";
import "./App.css";
import Main from "./components/main";

class App extends Component {
  render() {
    return <Main />;
  }
}

export default App;
