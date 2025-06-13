import React from 'react';

const RightPanel = ({ isRightPannelOpen, toggleRightPannel }) => {
  return (
    <div className={`right-pannel ${isRightPannelOpen ? "right-pannel-open" : ""}`}>
      <div className="profile-area right-pannel-style ">
        <i
          onClick={toggleRightPannel}
          className="fa-solid fa-xmark cross-logo icon-style"></i>
      </div>
      <hr />
      <div className="your-profile right-pannel-style component-style ">
        <i className="fa-regular fa-user icon-style"></i>
        <p>Your profile</p>
      </div>
      <div className="your-repository right-pannel-style component-style ">
        <i className="fa-solid fa-book icon-style"></i>
        <p>Your repositories</p>
      </div>
      <div className="your-projects right-pannel-style component-style">
        <i className="fa-solid fa-box icon-style"></i>
        <p>Your projects</p>
      </div>
      <div className="your-stars right-pannel-style component-style">
        <i className="fa-solid fa-star icon-style"></i>
        <p>Your stars</p>
      </div>
      <div className="your-gists right-pannel-style component-style">
        <i className="fa-solid fa-code icon-style"></i>
        <p>Your gists</p>
      </div>
      <div className="your-organisation right-pannel-style component-style">
        <i className="fa-solid fa-users icon-style"></i>
        <p>Your organisations</p>
      </div>
      <div className="your-entreprise right-pannel-style component-style">
        <i className="fa-solid fa-building icon-style"></i>
        <p>Your entreprise</p>
      </div>
      <div className="your-sponcers right-pannel-style component-style">
        <i className="fa-solid fa-heart icon-style "></i>
        <p>Your sponcers</p>
      </div>
      <hr />
      <div className="try-enterprise right-pannel-style component-style">
        <i className="fa-solid fa-building icon-style"></i>
        <p>Try enterprise</p>
      </div>
      <div className="feature-preview right-pannel-style component-style">
        <i className="fa-solid fa-eye icon-style"></i>
        <p>Feature preview</p>
      </div>
      <div className="settings right-pannel-style component-style">
        <i className="fa-solid fa-cog icon-style"></i>
        <p>Settings</p>
      </div>
      <hr />
      <div className="commit-control-web right-pannel-style component-style">
        <i className="fa-solid fa-code-commit icon-style"></i>
        <p>Commit control</p>
      </div>
      <div className="docs right-pannel-style component-style">
        <i className="fa-solid fa-file icon-style"></i>
        <p>Docs</p>
      </div>
      <div className="support right-pannel-style component-style">
        <i className="fa-solid fa-question icon-style"></i>
        <p>Support</p>
      </div>
      <div className="community right-pannel-style component-style">
        <i className="fa-solid fa-users icon-style"></i>
        <p>Community</p>
      </div>
      <hr />
      <div className="sign-out right-pannel-style component-style">
        <i className="fa-solid fa-sign-out icon-style"></i>
        <p>Sign out</p>
      </div>
    </div>
  );
};

export default RightPanel;
