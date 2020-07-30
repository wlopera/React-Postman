import React, { Component } from "react";
import "./App.css";
import LoadOrden from "./containers/LoadOrden";

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoadOrden />
      </div>
    );
  }
}

export default App;
