import React, { Component } from "react";
import { Form, Dropdown, TextArea } from "semantic-ui-react";
import "../../index.css";
import Service from "../Service/ApiService";
import convert from "xml-js";

class GetJob extends Component {
  state = {
    method: "POST",
    url: "http://localhost:4446/joc/api/jobscheduler/commands",
    request:
      '<jobscheduler_commands jobschedulerId="LAPTOP-OLQF0MB3_40444"> <show_job job="/service-ol/service-ccb/service"/> </jobscheduler_commands>',
    response: "",
  };

  render() {
    const options = [
      { key: 1, text: "GET", value: "GET" },
      { key: 2, text: "POST", value: "POST" },
      { key: 3, text: "PUT", value: "PUT" },
      { key: 4, text: "DELETE", value: "DELETE" },
    ];

    const handleJobChange = (el, data) => {
      const statusCopy = Object.assign({}, this.state);
      if (data) {
        statusCopy[data.name] = data.value;
      } else {
        statusCopy[el.target.name] = el.target.value;
      }
      this.setState(statusCopy);
    };

    const handlerGetJob = () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/xml");
      headers.append("X-Access-Token", this.props.accessToken);

      Service.invoke(headers, this.props.authorization, this.state).then((result) => {
        if (result.status === 200) {
          if ("application/xml" === result.headers.get("Content-type")) {
            result.text().then((xml) => {
              this.setState({ response: convert.xml2json(xml, { compact: false, spaces: 2 }) });
            });
          } else if ("application/json" === result.headers.get("Content-type")) {
            return result.json().then((json) => {
              this.setState({ response: json });
            });
          }
        } else {
          if (result.statusText) {
            this.setState({ response: "[Error] code: " + result.status + " - mensaje:  " + result.statusText });
          } else {
            return result.json().then((json) => {
              this.setState({ response: JSON.stringify(json, null, 2) });
            });
          }
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
                onChange={handleJobChange}
                name="method"
                selection
              />
            </Form.Input>
            <Form.Input className="divUrl">
              <input placeholder="url" value={this.state.url} onChange={handleJobChange} name="url" />
            </Form.Input>
            <Form.Input>
              <button onClick={handlerGetJob}>Enviar</button>
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <Form.Input className="divFormHttp">
              <TextArea
                placeholder="Request"
                rows="30"
                value={this.state.request}
                name="request"
                onChange={handleJobChange}
              />
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

export default GetJob;
