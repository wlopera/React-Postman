import React from "react";
import { Form } from "semantic-ui-react";
import "../../index.css";

const FormConfig = (props) => {
  /*
  Hooks:  (React 16.8) permiten usar el estado y otras características de React sin escribir una clase.
          Estado binario que determina si se muestra un tipo de input u otro. 
  */
  const [password, setPassword] = React.useState(false);
  const showPassword = () => setPassword(!password);

  if (props.show) {
    return (
      <Form className="divFormConfig">
        <Form.Field>
          <label>Usuario</label>
          <input
            placeholder="Agregar usuario"
            value={props.authorization.username}
            onChange={props.handleChange}
            name="username"
          />
        </Form.Field>
        <Form.Field>
          <label>Contraseña</label>
          <input
            placeholder="Agregar contraseña"
            type={password ? "text" : "password"}
            value={props.authorization.password}
            onChange={props.handleChange}
            name="password"
          />
        </Form.Field>
        <Form.Field>
          <Form.Checkbox label="Mostrar contraseña" onClick={showPassword} />
        </Form.Field>
      </Form>
    );
  } else {
    return null;
  }
};

export default FormConfig;
