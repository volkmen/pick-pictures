import React from "react";
import { arrayOf, string, func } from "prop-types";
import "./style.scss";

const SelectTopicComponent = ({ topics, setTopic }) => {
  return (
    <div className="select-topic">
      <ul className="select-topic__list">
        <h3 className="select-topic-list__title">Select a topic</h3>
        {topics.map((item) => {
          return (
            <li
              className="select-topic-list__item"
              key={item}
              onClick={(e) => setTopic(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

SelectTopicComponent.propTypes = {
  topics: arrayOf(string),
  setTopic: func,
};

export default SelectTopicComponent;
