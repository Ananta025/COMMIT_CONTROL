import React from 'react';

const RepositoryPanel = ({ isRepositoryPannelOpen }) => {
  return (
    <div className={`repository-pannel ${isRepositoryPannelOpen ? "repository-pannel-open" : ""}`}>
      <div className="new-repository component-style">
        <i className="fa-solid fa-book icon-style"></i>
        <p>Your repositories</p>
      </div>
      <div className="import-repository component-style">
        <i className="fa-solid fa-arrow-down icon-style"></i>
        <p>Import repository</p>
      </div>
      <hr />
      <div className="new-gist component-style">
        <i className="fa-solid fa-code icon-style"></i>
        <p>New gists</p>
      </div>
      <div className="issue component-style">
        <i className="fa-solid fa-exclamation-circle icon-style"></i>
        <p>New issue</p>
      </div>
      <hr />
      <div className="new-project component-style">
        <i className="fa-solid fa-box icon-style"></i>
        <p>New project</p>
      </div>
      <div className="new-repository component-style">
        <i className="fa-solid fa-book icon-style"></i>
        <p>New repository</p>
      </div>
    </div>
  );
};

export default RepositoryPanel;
