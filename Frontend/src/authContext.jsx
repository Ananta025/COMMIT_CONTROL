import React, {useState, useContext, createContext, useEffect} from 'react';


const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
}


export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser(userId);
    }
  }, []);

  const value = {
    user,
    setUser
  }

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  )
}