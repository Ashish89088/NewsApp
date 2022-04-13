import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/"><News key="general" pageSize={15} country="in" category="general" title="General"/></Route>
            <Route exact path="/business"><News key="business" pageSize={15} country="in" category="business" title="Business"/></Route>
            <Route exact path="/entertainment"><News key="entertainment" pageSize={15} country="in" catego exactry="entertainment" title="Entertainment"/></Route>
            <Route exact path="/general"><News key="general" pageSize={15} country="in" catego exactry="General" title="Top Headlines"/></Route>
            <Route exact path="/health"><News key="health" pageSize={15} country="in" category="health" title="Health"/></Route>
            <Route exact path="/science"><News key="science" pageSize={15} country="in" category="science" title="Science"/></Route>
            <Route exact path="/sports"><News key="sports" pageSize={15} country="in" category="sports" title="Sports"/></Route>
            <Route exact path="/technology"><News key="technology" pageSize={15} country="in" category="technology" title="Technology"/></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
