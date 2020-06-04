import React from "react";
import ErrorBoundaryComponent from "../ErrorBoundaryComponent";
import MainController from "../../controllers/MainController";
import "./style.css";

const RootComponent = () => {
  return (
    <ErrorBoundaryComponent>
      <div className="main-wrapper">
        {/*<HeaderComponent />*/}
        <MainController />
      </div>
    </ErrorBoundaryComponent>
  );
};

export default RootComponent;
