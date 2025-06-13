import React from 'react';

const LeftPanel = ({ isLeftPannelOpen, toggleLeftPannel }) => {
  return (
    <div className={`left-pannel ${isLeftPannelOpen ? "left-pannel-open" : ""}`}>
      <div className="left-pannel-header">
        <i className="fa-brands fa-github git-logo"></i>
        <i
          onClick={toggleLeftPannel}
          className="fa-solid fa-xmark cross-logo "></i>
      </div>
      <div className="top-component">
        <div className="home component-style">
          <i className="fa-solid fa-house icon-style-left"></i>
          <p>Home</p>
        </div>
        <div className="issue component-style">
          <i className="fa-solid fa-exclamation-circle icon-style-left"></i>
          <p>Issues</p>
        </div>
        <div className="pull-request component-style">
          <i className="fa-solid fa-code-pull-request icon-style-left"></i>
          <p>Pull requests</p>
        </div>
        <div className="projects component-style">
          <i className="fa-solid fa-box icon-style-left"></i>
          <p>Projects</p>
        </div>
        <div className="discussions component-style">
          <i className="fa-solid fa-comment icon-style-left"></i>
          <p>Discussions</p>
        </div>
        <div className="code-space component-style">
          <i className="fa-solid fa-code icon-style-left"></i>
          <p>Code space</p>
        </div>
        <hr />
        <div className="explore component-style">
          <i className="fa-solid fa-compass icon-style-left"></i>
          <p>Explore</p>
        </div>
        <div className="marketplace component-style">
          <i className="fa-solid fa-store icon-style-left"></i>
          <p>Marketplace</p>
        </div>
        <hr />
        <div className="repository">
          <h3>Repositories</h3>
          <i className="fa-brands fa-searchengin icon-style-left "></i>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
