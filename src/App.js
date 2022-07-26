import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {

  pageSize = 7;
    render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/"><News key="general" pageSize={this.pageSize} country="in" category="general" title="General"/></Route>
            <Route exact path="/business"><News key="business" pageSize={this.pageSize} country="in" category="business" title="Business"/></Route>
            <Route exact path="/entertainment"><News key="entertainment" pageSize={this.pageSize} country="in" catego exactry="entertainment" title="Entertainment"/></Route>
            <Route exact path="/general"><News key="general" pageSize={this.pageSize} country="in" catego exactry="General" title="Top Headlines"/></Route>
            <Route exact path="/health"><News key="health" pageSize={this.pageSize} country="in" category="health" title="Health"/></Route>
            <Route exact path="/science"><News key="science" pageSize={this.pageSize} country="in" category="science" title="Science"/></Route>
            <Route exact path="/sports"><News key="sports" pageSize={this.pageSize} country="in" category="sports" title="Sports"/></Route>
            <Route exact path="/technology"><News key="technology" pageSize={this.pageSize} country="in" category="technology" title="Technology"/></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
