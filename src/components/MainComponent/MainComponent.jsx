import React from "react";
import { arrayOf, func, number, string } from "prop-types";

import SelectTopicComponent from "../SelectTopicComponent";
import GridPicturesController from "../../controllers/GridPicturesController";
import "./style.scss";

const MainComponent = (props) => {
  const { currentTopic, ...anotherProps } = props;

  return (
    <main className={"main"}>
      {currentTopic ? (
        <GridPicturesController {...anotherProps} topic={props.currentTopic} />
      ) : (
        <SelectTopicComponent topics={props.topics} setTopic={props.setTopic} />
      )}
    </main>
  );
};

MainComponent.propTypes = {
  topics: arrayOf(string),
  currentTopic: string,
  setTopic: func,
  resetTopic: func,
  setResult: func,
  onError: func,
  amount: number,
};

export default MainComponent;
