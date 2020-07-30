import React, { Component } from "react";
import Menu from "../components/MenuOption/MenuOption";
import Token from "../components/Component/Token";
import FormConfig from "../components/Config/FormConfig";
import GetJob from "../components/Component/GetJob";
import Service from "../components/Service/ApiService";
import convert from "xml-js";
import Data from "../components/Data/Data";
import format from "xml-formatter";

class LoadOrden extends Component {
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
    http: Data.getDataByItem("Token"),
  };

  handleMenuClick = (event, { name }) => {
    this.setState({ activeItem: name, showConfig: false, showJob: false, showToken: false });
    if (name === "Token") {
      this.setState({
        showToken: true,
        http: Data.getDataByItem("Token"),
      });
    } else if (name === "Consultar JOB") {
      this.setState({
        showJob: true,
        http: Data.getDataByItem("Consultar JOB"),
      });
    } else if (name === "Parámetros") {
      this.setState({ showConfig: true });
    }
  };

  handleFormConfigChange = (el) => {
    const statusCopy = Object.assign({}, this.state);
    statusCopy.authorization[el.target.name] = el.target.value;
    this.setState(statusCopy);
  };

  handleChange = (el, field) => {
    const statusCopy = Object.assign({}, this.state);
    if (field) {
      statusCopy.http[field.name] = field.value;
    } else {
      statusCopy.http[el.target.name] = el.target.value;
    }
    this.setState(statusCopy);

    Data.handleDataChange(this.state.activeItem, el, field);
  };

  handlerSendHttp = (headers) => {
    Service.invoke(headers, this.state.authorization, this.state.http).then((result) => {
      if (result.status === 200) {
        result.json().then((json) => {
          this.setState({ accessToken: json.accessToken });
          const el = { target: { name: "response", value: JSON.stringify(json, null, 2) } };
          this.handleChange(el);
        });
      } else {
        this.setState({
          accessToken: "",
        });
        const el = {
          target: { name: "response", value: "[Error] code: " + result.status + " - mensaje:  " + result.statusText },
        };
        this.handleChange(el);
      }
    });
  };

  handlerGetJob = (headers) => {
    Service.invoke(headers, this.state.authorization, this.state.http).then((result) => {
      if (result.status === 200) {
        if ("application/xml" === result.headers.get("Content-type")) {
          result.text().then((xml) => {
            const el = { target: { name: "response", value: format(xml) } };
            this.handleChange(el);
          });
        } else if ("application/json" === result.headers.get("Content-type")) {
          return result.json().then((json) => {
            this.setState({ response: json });
          });
        }
      } else {
        if (result.statusText) {
          const el = {
            target: { name: "response", value: "[Error] code: " + result.status + " - mensaje:  " + result.statusText },
          };
          this.handleChange(el);
        } else {
          return result.json().then((json) => {
            const el = { target: { name: "response", value: JSON.stringify(json, null, 2) } };
            this.handleChange(el);
          });
        }
      }
    });
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
          http={this.state.http}
          change={this.handleChange}
          sendHttp={this.handlerSendHttp}
        />
        <GetJob
          show={this.state.showJob}
          http={this.state.http}
          accessToken={this.state.accessToken}
          change={this.handleChange}
          sendHttp={this.handlerGetJob}
        />
      </div>
    );
  }
}

export default LoadOrden;
