import React, { Component } from "react";
import "./App.css";

import Heroes from "./components/Heroes";
import Game from "./components/Game";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Tension</h1>
        <div className="header-bar" />
        <Heroes />
        <Game />
      </div>
    );
  }
}

export default App;
