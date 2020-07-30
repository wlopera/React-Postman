import React, { Component } from "react";
import { Form, Dropdown, TextArea } from "semantic-ui-react";
import "../../index.css";

const options = [
  { key: 1, text: "GET", value: "GET" },
  { key: 2, text: "POST", value: "POST" },
  { key: 3, text: "PUT", value: "PUT" },
  { key: 4, text: "DELETE", value: "DELETE" },
];

const token = (props) => {
  const sendToken = () => {
    props.sendHttp(new Headers());
  };

  if (props.show) {
    return (
      <Form>
        <Form.Group>
          <Form.Input>
            <Dropdown
              clearable
              options={options}
              value={props.http.method}
              onChange={props.change}
              name="method"
              selection
            />
          </Form.Input>
          <Form.Input className="divUrl">
            <input placeholder="url" value={props.http.url} onChange={props.change} name="url" />
          </Form.Input>
          <Form.Input>
            <button onClick={sendToken}>Enviar</button>
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input className="divFormHttp">
            <TextArea placeholder="Request" rows="30" onChange={props.change} name="request" />
          </Form.Input>
          <Form.Input className="divFormGetHttp">
            <TextArea placeholder="Response" rows="30" value={props.http.response} />
          </Form.Input>
        </Form.Group>
      </Form>
    );
  } else {
    return null;
  }
};

export default token;
