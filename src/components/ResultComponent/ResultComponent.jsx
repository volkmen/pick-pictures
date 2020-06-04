import React from "react";

import ButtonComponent from "../ButtonComponent";
import "./style.scss";

const ResultComponent = ({ isPassed, resetTopic }) => {
  return (
    <div className="result">
      <h1 className="result__title">
        {isPassed ? "Congratulations!!!" : "You failed. Try again"}
      </h1>
      <div className="js-c w-100">
        <ButtonComponent content={"try again"} onClick={resetTopic} />
      </div>
    </div>
  );
};

export default ResultComponent;
