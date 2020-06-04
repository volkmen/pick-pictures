import React from "react";
import ErrorBoundaryComponent from "../ErrorBoundaryComponent";
import MainContainer from "../../containers/MainContainer";
import "./style.css";

const RootComponent = () => {
  return (
    <ErrorBoundaryComponent>
      <div className="main-wrapper">
        {/*<HeaderComponent />*/}
        <MainContainer />
      </div>
    </ErrorBoundaryComponent>
  );
};

export default RootComponent;
