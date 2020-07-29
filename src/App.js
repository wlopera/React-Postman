import React, { Component } from "react";
import "./App.css";
import Menu from "./Components/MenuOption/MenuOption";
import Token from "./Components/Component/Token";
import FormConfig from "./Components/Config/FormConfig";
import GetJob from "./Components/Component/GetJob";

class App extends Component {
  state = {
    activeItem: "Token",
    showToken: true,
    showJob: false,
    showConfig: false,
    authorization: {
      username: "root",
      password: "root",
    },
    accessToken: "",
  };

  handleMenuClick = (event, { name }) => {
    this.setState({ activeItem: name, showConfig: false, showJob: false, showToken: false });
    if (name === "Token") {
      this.setState({ showToken: true });
    }
    if (name === "Parámetros") {
      this.setState({ showConfig: true });
    }
    if (name === "Consultar JOB") {
      this.setState({ showJob: true });
    }
  };

  handleFormConfigChange = (el) => {
    const inputName = el.target.name;
    const inputValue = el.target.value;
    const statusCopy = Object.assign({}, this.state);
    statusCopy.authorization[inputName] = inputValue;
    this.setState(statusCopy);
  };

  updateAccessToken = (accessToken) => {
    this.setState({ accessToken: accessToken });
  };

  render() {
    return (
      <div className="App">
        <Menu activeItem={this.state.activeItem} handleMenuClick={this.handleMenuClick} />
        <FormConfig
          show={this.state.showConfig}
          authorization={this.state.authorization}
          handleChange={this.handleFormConfigChange}
        />
        <Token
          show={this.state.showToken}
          authorization={this.state.authorization}
          updateAccessToken={this.updateAccessToken}
        />
        <GetJob
          show={this.state.showJob}
          authorization={this.state.authorization}
          accessToken={this.state.accessToken}
        />
      </div>
    );
  }
}

export default App;
