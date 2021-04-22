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
      JoblyApi.setToken('');
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

  const resetFormData = (apiMethod) => {
    if(apiMethod === 'logIn') setFormData( { username: '', password: ''} );
    else setSignupFormData( {username: '', password: '', firstName:'', lastName: '', email: ''});
  };

  const handleFormChange = (evt, login=false) => {
    const { name, value } = evt.target;
    if (login) setFormData( data => ({...data, [name]: value}));
    else setSignupFormData(data => ({...data, [name]: value}))
  };

  const handleFormSubmit = async (evt, apiMethod, formInfo) => {
    evt.preventDefault();
    try {
      let token = await JoblyApi[ [apiMethod] ](formInfo);
      setUserToken(token);
      setValidCredentials(true);
      const user_ = await JoblyApi.getUser(formInfo.username);
      setUserInfo(user_);
      resetFormData(apiMethod);
      setErrorMessage('');
      setIsLoggedIn(true);
    }catch(err) {
      setValidCredentials(false);
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
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
            userToken={userToken}
            user={user}
            formData={formData}
            validCredentials={validCredentials}
            signupFormData={signupFormData}
            errorMessage={errorMessage}
          />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
