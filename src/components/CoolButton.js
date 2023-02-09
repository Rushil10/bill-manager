import React from "react";
import "./CoolButton.css";

function CoolButton(props) {
  return (
    <button onClick={props.onClick} className="coolbutton">
      {props.name}
    </button>
  );
}

export default CoolButton;
