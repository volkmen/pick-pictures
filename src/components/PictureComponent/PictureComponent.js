import React, { createRef, Component } from "react";
import { func, string, bool } from "prop-types";
import "./style.scss";

class PictureComponent extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  componentDidMount() {
    this.ref.current.onload = () => this.props.onLoad(this.props.src);
    this.ref.current.onerror = () =>
      this.props.onError("loading picture failed");
  }

  render() {
    const { src, onClick, selected } = this.props;
    return (
      <div
        className={
          selected
            ? "grid-pictures-content__picture selected"
            : "grid-pictures-content__picture"
        }
        onClick={() => onClick(src)}
      >
        <img src={src} alt="some-pict" ref={this.ref} />
      </div>
    );
  }
}

PictureComponent.propTypes = {
  onLoad: func,
  onError: func,
  src: string,
  selected: bool,
  onClick: func,
};

export default PictureComponent;
