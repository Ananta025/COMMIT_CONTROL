import React,{useState, useEffect} from 'react'
import "./Navbar.css";

export default function Navbar() {
  const [isLeftPannelOpen, setIsLeftPannelOpen] = useState(false);
  const [isRightPannelOpen, setIsRightPannelOpen] = useState(false);
  const [isRepositoryPannelOpen, setIsRepositoryPannelOpen] = useState(false);
    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (!userId){
        window.location.href = "/login";
      }
      const fetchRepositories = async () => {
        try{
          setLoading(true);
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/repo/user/${userId}`);
          const repositories = await response.json();
          setRepositories(repositories);
          setLoading(false);
  
        }catch(err){
          console.error("Error while fetching repositories",err);
        }
      }
      const fetchSuggestedRepositories = async () => {
        try{
          setLoading(true);
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/repo/all-repositories`);
          const repositories = await response.json();
          setSuggestedRepositories(repositories);
          setLoading(false);
  
        }catch(err){
          console.error("Error while fetching repositories",err);
        }
      }
      fetchRepositories();
      fetchSuggestedRepositories();
    }, []);
  
  
    useEffect(() => {
      if(searchQuery.length === 0){
        setSearchResults(repositories);
      }else{
        const filteredRepo = repositories.filter(repo => repo.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(filteredRepo);
      }
    }, [searchQuery, repositories]);

  const toggleLeftPannel = () => {
    setIsLeftPannelOpen(!isLeftPannelOpen);
  };
  const toggleRightPannel = () => {
    setIsRightPannelOpen(!isRightPannelOpen);
  };
  const toggleRepositoryPannel = () => {
    setIsRepositoryPannelOpen(!isRepositoryPannelOpen);
  };
  


  return (
    <div className="navbar">
      
      
      
      <nav className="nav-bar">
        <div className="left-content">
            <div
            onClick={toggleLeftPannel}
            className="hambargur border-style">
              <i className="fa-solid fa-bars hambargur"></i>
            </div>
            <div className="git-logo">
              <i className="fa-brands fa-github git-logo"></i>
            </div>
            <h2 className='dashboard-heading'>Dashboard</h2>
        </div>
        <div className="right-content">
          <div className="search-bar border-style">
            <i className="fa-brands fa-searchengin"></i>
            <input type="text" placeholder="Search repositories" />
          </div>
          <div
          onClick={toggleRepositoryPannel}
          className="create-new-repo border-style">
            <i className="fa-solid fa-plus"></i>
            <i className="fa-solid fa-angle-down down-angle"></i>
          </div>
          <div className="create-issue border-style">
            <i className="fa-regular fa-circle-dot"></i>
          </div>
          <div className="create-pull-request border-style">
            <i className="fa-solid fa-code-pull-request"></i>
          </div>
          <div className="notification border-style">
            <i className="fa-solid fa-bell"></i>
          </div>
          <div
          onClick={toggleRightPannel}
          className="profile">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </nav>


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



      <div className="left-container">
        <div className="suggested-repository">
          <h3>Suggested repository</h3>
          <div className='new-button'><i className="fa-solid fa-book"></i><p>new</p></div>
        </div>
        <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search-repository' type="text" placeholder="Find a repository" />
        <div className="repository-list">
          {
            suggestedRepositories.map(repo => (
              <div className='suggested-repo-style' key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          }
        </div>
      </div>


      <div className="right-container">
        
   
      </div>

    </div>
  )
}
