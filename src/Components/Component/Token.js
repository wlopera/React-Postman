import React, { Component } from "react";
import { Form, Dropdown, TextArea } from "semantic-ui-react";
import Service from "../Service/ApiService";
import "../../index.css";

class Token extends Component {
  state = {
    method: "POST",
    url: "http://localhost:4446/joc/api/security/login",
    request: null,
    response: "",
  };

  render() {
    const options = [
      { key: 1, text: "GET", value: "GET" },
      { key: 2, text: "POST", value: "POST" },
      { key: 3, text: "PUT", value: "PUT" },
      { key: 4, text: "DELETE", value: "DELETE" },
    ];

    const handleChange = (el, data) => {
      const statusCopy = Object.assign({}, this.state);
      if (data) {
        statusCopy[data.name] = data.value;
      } else {
        statusCopy[el.target.name] = el.target.value;
      }
      this.setState(statusCopy);
    };

    const handlerSendToken = () => {
      const headers = new Headers();

      Service.invoke(headers, this.props.authorization, this.state).then((result) => {
        if (result.status === 200) {
          result.json().then((json) => {
            this.props.updateAccessToken(json.accessToken);
            this.setState({ response: JSON.stringify(json, null, 2) });
          });
        } else {
          this.props.updateAccessToken("");
          this.props.updateAccessToken("");
          this.setState({ response: "[Error] code: " + result.status + " - mensaje:  " + result.statusText });
        }
      });
    };

    if (this.props.show) {
      return (
        <Form>
          <Form.Group>
            <Form.Input>
              <Dropdown
                clearable
                options={options}
                value={this.state.method}
                onChange={handleChange}
                name="method"
                selection
              />
            </Form.Input>
            <Form.Input className="divUrl">
              <input placeholder="url" value={this.state.url} onChange={handleChange} name="url" />
            </Form.Input>
            <Form.Input>
              <button onClick={handlerSendToken}>Enviar</button>
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <Form.Input className="divFormHttp">
              <TextArea placeholder="Request" rows="30" />
            </Form.Input>
            <Form.Input className="divFormGetHttp">
              <TextArea placeholder="Response" rows="30" value={this.state.response} />
            </Form.Input>
          </Form.Group>
        </Form>
      );
    } else {
      return null;
    }
  }
}

export default Token;
