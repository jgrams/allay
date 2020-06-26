import React, { Component } from "react";
import "./App.css";

import Game from "./components/Game";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Allay</h1>
        <div className="header-bar" />
        <app-heroes />
        <Game />
      </div>
    );
  }
}

export default App;
