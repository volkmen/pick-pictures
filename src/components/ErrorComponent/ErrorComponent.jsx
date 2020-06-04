import React from "react";
import { string } from "prop-types";

import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./style.scss";

const ErrorComponent = ({ message, onClick }) => {
  return (
    <div className="error">
      <h1 className="error__title">{message}</h1>
      <div className="error__content">
        <ButtonComponent onClick={onClick} content={"Try again"} />
      </div>
    </div>
  );
};

ErrorComponent.propsType = {
  message: string,
};

export default ErrorComponent;
