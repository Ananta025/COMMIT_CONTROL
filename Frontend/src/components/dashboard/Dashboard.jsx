import React,{useState,useEffect} from 'react'
import Navbar from "../ui/Navbar";

export default function Dashboard() {
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


  return (
    <div className="dashboard">
      <Navbar />

      {/* <aside>
        <h3>suggested Repositories</h3>
        {
          suggestedRepositories.map(repo => (
            <div key={repo._id}>
              <h4>{repo.name}</h4>
              <p>{repo.description}</p>
              <button>View</button>
            </div>
          ))
        }
      </aside>
      <main>
        <h3>Your repository</h3>
        <div className="search-field">
          <input type="text" placeholder="Search repositories" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value )}/>
        </div>
        {
          searchResults.map(repo => (
            <div key={repo._id}>
              <h4>{repo.name}</h4>
              <p>{repo.description}</p>
              <button>View</button>
            </div>
          ))
        }
      </main>
      <aside>
        <h3>UPcommimg events</h3>
        <ul>
          <li>Event 1</li>
          <li>Event 2</li>
          <li>Event 3</li>
        </ul>
      </aside> */}
    </div>
  )
}
