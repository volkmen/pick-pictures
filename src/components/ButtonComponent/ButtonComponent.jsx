import React from "react";
import { string, func } from "prop-types";

import { doScale } from "../../utils";
import "./style.css";

const ButtonComponent = ({ onClick, content }) => {
  return (
    <div
      className="button"
      onClick={(e) => {
        doScale(e, 1);
        onClick();
      }}
      onMouseDown={(e) => doScale(e, 0.95)}
    >
      <div>{content}</div>
    </div>
  );
};

ButtonComponent.propTypes = {
  onClick: func,
  content: string,
};

export default ButtonComponent;
