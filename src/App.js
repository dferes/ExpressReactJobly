import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';
import JoblyApi from './api';

function App() {
  const emptyUserData = {username: '', firstName: '', lastName: '', email: '', isAdmin: '', applications: []};
  const [ companies, setCompanies ] = useState([]);
  const [ jobs, setJobs ] = useState([]);
  const [ userToken, setUserToken ] = useState('');
  const [ user, setUser ] = useState( emptyUserData );
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  // Combine state for userToken and user by putting the token in the user info
  const [ formData, setFormData ] = useState({ username: '', password: ''});
  const [ validCredentials, setValidCredentials ] = useState(true);
  const [ signupFormData, setSignupFormData ] = useState( emptyUserData );
  const [ errorMessage, setErrorMessage ] = useState('');

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

  //  Refactor the 4 functions below into 2, pass the type of form data aswell as
  //  the api methhod as a string

  const handleLoginChange = evt => {
    const { name, value } = evt.target;
    setFormData( data => ({...data, [name]: value}));
  };

  const handleLoginSubmit = async evt => {
    evt.preventDefault();
    try {
      let token = await JoblyApi.logIn(formData);
      setUserToken(token);
      // console.log('----------->TOKENS MATCH ? : ', JoblyApi.token === token );
      setValidCredentials(true);
      
      const user = await JoblyApi.getUser(formData.username);
      setUserInfo(user);
      setFormData({ username: '', password: ''});
      setErrorMessage('');
      setIsLoggedIn(true);
    }catch(err) {
      setValidCredentials(false);
    }
  };


  
  const handleSignupChange = evt => {
    const { name, value } = evt.target;
    setSignupFormData( data => ({...data, [name]: value}));
  };

  const handleSignupSubmit = async evt => {
    evt.preventDefault();
    try {
      const token = await JoblyApi.signup(signupFormData);
      setUserToken(token);
      setValidCredentials(true);

      const user_ = await JoblyApi.getUser(signupFormData.username);
      setUserInfo(user_);
      setSignupFormData( {username: '', password: '', firstName:'', lastName: '', email: ''});
      setErrorMessage('');
      setIsLoggedIn(true);
    }catch(err) {
      setErrorMessage(err);  
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
            signupFormData={signupFormData}
            handleSignupChange={handleSignupChange}
            handleSignupSubmit={handleSignupSubmit}
            errorMessage={errorMessage}
          />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
