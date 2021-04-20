import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter, useHistory } from 'react-router-dom';
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
  const [ formData, setFormData ] = useState({ username: '', password: ''});
  const [ validCredentials, setValidCredentials ] = useState(true);
  const history = useHistory();

  useEffect( () => {
    const getCompanies = async () => {
      const allCompanies = await JoblyApi.getAllCompanies();
      setCompanies(allCompanies);
    }

    const getJobs = async () => {
      const allJobs = await JoblyApi.getAllJobs();
      setJobs(allJobs);
    }

    getCompanies(); // await for these 2??
    getJobs();
  }, []);


  useEffect( () => {
    const logout = () => {
      setUserToken('');
      setUser({username:'', firstName:'', lastName:'', email:'', isAdmin:'', applications:[]});
    };
    
    if (!isLoggedIn) logout();
  }, [isLoggedIn]);



  const setUserInfo = user => {
    setUser({
      username:     user.username,
      firstName:    user.firstName,
      lastName:     user.lastName,
      email:        user.email,
      isAdmin:      user.isAdmin,
      applications: user.applications
    });
  }

  const handleLoginChange = evt => {
    const { name, value } = evt.target;
    setFormData( data => ({...data, [name]: value}));
  };

  const handleLoginSubmit = async evt => {
    evt.preventDefault();
    try {
      let token = await JoblyApi.logIn(formData.username, formData.password);
      setUserToken(token);
      setValidCredentials(true);
      const user = await JoblyApi.getUser(formData.username);
      setUserInfo(user);
      setIsLoggedIn(true);
      // history.push('/'); Need to fix this later...
    }catch(err) {
      // console.log('ERR: ', err);
      setValidCredentials(false);
    }
  };

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
            handleLoginChange={handleLoginChange}
            handleLoginSubmit={handleLoginSubmit}
            userToken={userToken}
            user={user}
            formData={formData}
            validCredentials={validCredentials}
          />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
