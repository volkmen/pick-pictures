import React, { Component } from "react";
import MainComponent from "../components/MainComponent/MainComponent";
import CONFIG from "../CONFIG";
import service from "../services/APIservice";
import ResultComponent from "../components/ResultComponent/ResultComponent";
import ErrorComponent from "../components/ErrorComponent/ErrorComponent";

const { pictureTopics } = CONFIG;

class MainController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: pictureTopics.slice(0),
      currentTopic: null,
      amountValidPictures: Math.floor(Math.random() * 3) + 3,
      result: null,
      error: false,
      errorMessage: "",
    };

    this.setTopic = this.setTopic.bind(this);
    this.resetTopic = this.resetTopic.bind(this);
    this.setResult = this.setResult.bind(this);
    this.onError = this.onError.bind(this);
  }

  setTopic(topic) {
    this.setState({ currentTopic: topic });
  }

  setResult(result) {
    this.setState({ result: result });
  }

  onError(msg) {
    this.setState({ error: true, errorMessage: msg });
  }

  resetTopic() {
    this.setState({
      currentTopic: null,
      result: null,
      error: null,
      errorMessage: "",
    });
    service.resetUrls();
  }

  render() {
    const {
      topics,
      currentTopic,
      amountValidPictures,
      result,
      error,
      errorMessage,
    } = this.state;

    if (result !== null)
      return <ResultComponent isPassed={result} resetTopic={this.resetTopic} />;

    if (error)
      return (
        <ErrorComponent message={errorMessage} onClick={this.resetTopic} />
      );

    return (
      <MainComponent
        topics={topics}
        currentTopic={currentTopic}
        setTopic={this.setTopic}
        amount={amountValidPictures}
        resetTopic={this.resetTopic}
        setResult={this.setResult}
        onError={this.onError}
      />
    );
  }
}

MainController.propTypes = {};

export default MainController;
