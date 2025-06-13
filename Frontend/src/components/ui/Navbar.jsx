import React, { useState, useEffect, useRef } from 'react'
import "./Navbar.css";
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import RepositoryPanel from './RepositoryPanel';

export default function Navbar() {
  const [isLeftPannelOpen, setIsLeftPannelOpen] = useState(false);
  const [isRightPannelOpen, setIsRightPannelOpen] = useState(false);
  const [isRepositoryPannelOpen, setIsRepositoryPannelOpen] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Refs for click outside detection
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const repoPanelRef = useRef(null);
  const leftToggleRef = useRef(null);
  const rightToggleRef = useRef(null);
  const repoToggleRef = useRef(null);

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

  // Handle clicking outside panels
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check left panel
      if (isLeftPannelOpen && 
          leftPanelRef.current && 
          !leftPanelRef.current.contains(event.target) &&
          leftToggleRef.current &&
          !leftToggleRef.current.contains(event.target)) {
        setIsLeftPannelOpen(false);
      }

      // Check right panel
      if (isRightPannelOpen && 
          rightPanelRef.current && 
          !rightPanelRef.current.contains(event.target) &&
          rightToggleRef.current &&
          !rightToggleRef.current.contains(event.target)) {
        setIsRightPannelOpen(false);
      }

      // Check repository panel
      if (isRepositoryPannelOpen && 
          repoPanelRef.current && 
          !repoPanelRef.current.contains(event.target) &&
          repoToggleRef.current &&
          !repoToggleRef.current.contains(event.target)) {
        setIsRepositoryPannelOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLeftPannelOpen, isRightPannelOpen, isRepositoryPannelOpen]);

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
              ref={leftToggleRef}
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
            ref={repoToggleRef}
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
            ref={rightToggleRef}
            onClick={toggleRightPannel}
            className="profile">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </nav>

      <div ref={leftPanelRef}>
        <LeftPanel 
          isLeftPannelOpen={isLeftPannelOpen} 
          toggleLeftPannel={toggleLeftPannel} 
        />
      </div>
      
      <div ref={rightPanelRef}>
        <RightPanel 
          isRightPannelOpen={isRightPannelOpen} 
          toggleRightPannel={toggleRightPannel} 
        />
      </div>
      
      <div ref={repoPanelRef}>
        <RepositoryPanel 
          isRepositoryPannelOpen={isRepositoryPannelOpen} 
        />
      </div>

      <div className="left-container">
        <div className="suggested-repository">
          <h3>Suggested repository</h3>
          <div className='new-button'><i className="fa-solid fa-book"></i><p>new</p></div>
        </div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='search-repository' 
          type="text" 
          placeholder="Find a repository" 
        />
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
