import React from "react";
import { Menu, Segment } from "semantic-ui-react";

const MenuOption = (props) => {
  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item name="Token" active={props.activeItem === "Token"} onClick={props.handleMenuClick} />
        <Menu.Item name="Consultar JOB" active={props.activeItem === "Consultar JOB"} onClick={props.handleMenuClick} />
        <Menu.Item name="Parámetros" active={props.activeItem === "Parámetros"} onClick={props.handleMenuClick} />
      </Menu>
    </Segment>
  );
};

export default MenuOption;
