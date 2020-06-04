import React, { Component } from "react";
import { arrayOf, func, number, string } from "prop-types";

import GridPicturesComponent from "../components/GridPicturesComponent";
import { generateStr, genUniqIndexes } from "../utils";
import service from "../services/APIservice";
import CONFIG from "../CONFIG";
import SpinnerComponent from "../components/SpinnerComponent";
import ButtonComponent from "../components/ButtonComponent";

const { cols, rows } = CONFIG;

class GridPicturesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      picsIds: {},
      rowsKeys: null,
      selectedPictures: {},
      picturesLoaded: false,
    };

    this.checkResult = this.checkResult.bind(this);
    this.getPictureInfo = this.getPictureInfo.bind(this);
    this.pictureOnLoad = this.pictureOnLoad.bind(this);
  }

  setRowkeys() {
    const rowsKeys = Array.from(new Array(cols)).map((_) => generateStr());
    this.setState({ rowsKeys: rowsKeys });
  }

  componentDidMount() {
    const { amount } = this.props;
    const topicPicturesIndexes = genUniqIndexes(amount, cols * rows);

    this.setRowkeys();
    const indexTopic = this.props.topics.indexOf(this.props.topic);

    const anotherTopics = [
      ...this.props.topics.slice(0, indexTopic),
      ...this.props.topics.slice(indexTopic + 1),
    ].join(",");

    // eslint-disable-next-line
    Array.from(new Array(cols * rows)).map((_, i) => {
      const isFromTopic = topicPicturesIndexes.indexOf(i) > -1;
      const promise = isFromTopic
        ? service.getPicture(this.props.topic, i)
        : service.getPicture(anotherTopics, i);

      promise
        .then((url) => {
          this.setState({
            picsIds: {
              ...this.state.picsIds,
              [i]: {
                ind: i,
                id: url,
                isFromTopic: isFromTopic,
                selected: false,
                loaded: false,
              },
            },
          });
        })
        .catch(() => {
          this.props.onError("Bad request...");
        });
    });
  }

  onSelectPicture = (src) => {
    const { ind, selected } = this.getPictureInfo(src);

    this.setState({
      picsIds: {
        ...this.state.picsIds,
        [ind]: {
          ...this.state.picsIds[ind],
          selected: !selected,
        },
      },
    });
  };

  getPictureInfo(src) {
    return Object.values(this.state.picsIds).filter(
      (item) => item.id === src
    )[0];
  }

  pictureOnLoad = (src) => {
    const { ind } = this.getPictureInfo(src);
    const picturesLoaded =
      Object.values(this.state.picsIds).filter(({ loaded }) => loaded)
        .length ===
      cols * rows - 1;

    this.setState({
      picturesLoaded: picturesLoaded,
      picsIds: {
        ...this.state.picsIds,
        [ind]: {
          ...this.state.picsIds[ind],
          loaded: true,
        },
      },
    });
  };

  checkResult() {
    const isPassed = Object.values(this.state.picsIds)
      .filter(({ selected, isFromTopic }) => selected || isFromTopic)
      .every(({ selected, isFromTopic }) => selected && isFromTopic);

    this.props.setResult(isPassed);
  }

  render() {
    const { picsIds, rowsKeys } = this.state;
    const { resetTopic, topic, amount, onError } = this.props;
    const dataFetched = Object.values(picsIds).length === cols * rows;

    return (
      <div>
        {dataFetched && this.state.picturesLoaded ? null : <SpinnerComponent />}
        {dataFetched && (
          <div className={this.state.picturesLoaded ? "" : "d-none"}>
            <GridPicturesComponent
              topic={topic}
              amount={amount}
              onError={onError}
              onSelectPicture={this.onSelectPicture}
              pictureOnLoad={this.pictureOnLoad}
              rowsKeys={rowsKeys}
              picsIds={picsIds}
            />

            <div className="jc-s w-100">
              <ButtonComponent onClick={resetTopic} content={"Reset"} />
              <ButtonComponent onClick={this.checkResult} content={"Verify"} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

GridPicturesContainer.propTypes = {
  topics: arrayOf(string),
  topic: string,
  resetTopic: func,
  setResult: func,
  onError: func,
  amount: number,
};

export default GridPicturesContainer;
