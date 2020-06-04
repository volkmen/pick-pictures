import React from "react";
import { number, string, func, array, object } from "prop-types";

import PictureComponent from "../PictureComponent/PictureComponent";
import SpinnerComponent from "../SpinnerComponent";
import CONFIG from "../../CONFIG";
import "./style.scss";

const { cols, rows } = CONFIG;

const GridPicturesComponent = ({
  amount,
  topic,
  picsIds,
  rowsKeys,
  onSelectPicture,
  pictureOnLoad,
  onError,
}) => {
  if (Object.values(picsIds).length < cols * rows) return <SpinnerComponent />;

  return (
    <div className="grid-pictures">
      <h3 className="grid-pictures__title">
        {" "}
        Select {amount} pictures of selected topic -
        <span className="bold">"{topic}"</span>
      </h3>
      <div className="grid-pictures__content">
        {rowsKeys.map((_, i) => {
          return (
            <div className="grid-pictures-content__row" key={rowsKeys[i]}>
              {Array.from(new Array(cols)).map((_, j) => {
                const { id, selected } = picsIds[i * cols + j];
                return (
                  <PictureComponent
                    key={id}
                    src={id}
                    selected={selected}
                    onClick={onSelectPicture}
                    onLoad={pictureOnLoad}
                    onError={onError}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

GridPicturesComponent.propTypes = {
  topic: string,
  amount: number,
  picsIds: object,
  rowsKeys: array,
  onSelectPicture: func,
  pictureOnLoad: func,
  onError: func,
};

export default GridPicturesComponent;
