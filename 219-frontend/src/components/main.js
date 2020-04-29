import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Landing from "../components/Landing/landing";
import Room from "../components/Room/Room";
import Quiz from "../components/Quiz/Quiz";
import Result from "../components/Results/results"

export default class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Landing} exact={true} />
          <Route path="/room" component={Room} exact={true} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/results" component={Result} />
        </Switch>
      </BrowserRouter>
    );
  }
}
