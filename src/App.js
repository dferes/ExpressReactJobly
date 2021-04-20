import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';
import JoblyApi from './api';

function App() {
  const [ companies, setCompanies ] = useState([]);
  const [ jobs, setJobs ] = useState([]);
  const [ userToken, setUserToken ] = useState('');
  const [ user, setUser ] = useState({username: '', firstName: '', lastName: '', email: '', isAdmin: '', applications: []});
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  // Combine state for userToken and user by putting the token in the user info

  useEffect( () => {
    const getCompanies = async () => {
      const allCompanies = await JoblyApi.getAllCompanies();
      setCompanies(allCompanies);
    }

    const getJobs = async () => {
      const allJobs = await JoblyApi.getAllJobs();
      setJobs(allJobs);
    }

    getCompanies();
    getJobs();
  }, []);


  useEffect( () => {
    const logout = () => {
      setUserToken('');
      setUser({username:'', firstName:'', lastName:'', email:'', isAdmin:'', applications:[]});
    };
    
    if (!isLoggedIn) logout();
  }, [isLoggedIn]);


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar 
          userToken={userToken} 
          setIsLoggedIn={setIsLoggedIn}
          user={user} 
        />
        <main>
          <Routes 
            companies={companies} 
            jobs={jobs} 
            userToken={userToken}
            setUserToken={setUserToken}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
            user={user}
          />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
