import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';
import useLocalStorage from './hooks/useLocalStorage';
import JoblyApi from './api';


function App() {
  const emptyUserData = {username: '', firstName: '', lastName: '', email: '', isAdmin: '', applications: []};
  const [ companies, setCompanies ] = useState([]);
  const [ jobs, setJobs ] = useState([]);

  const [ loginFormData, setLoginFormData ] = useState({ username: '', password: ''});
  const [ signupFormData, setSignupFormData ] = useState( emptyUserData );
  const [ errorMessage, setErrorMessage ] = useState({ login: '', signup: ''});
  
  const [ userToken, setUserToken ] = useLocalStorage('userToken', '');
  const [ user, setUser ] = useLocalStorage('user',  emptyUserData );
  const [ isLoggedIn, setIsLoggedIn ] = useLocalStorage('isLoggedIn', false);
  

  useEffect( () => {
    const getCompanies = async () => {
      const allCompanies = await JoblyApi.getAllCompanies();
      setCompanies(allCompanies);
    };

    const getJobs = async () => {
      const allJobs = await JoblyApi.getAllJobs();
      setJobs(allJobs);
    };
    
    getCompanies();
    getJobs();
  }, []);


  useEffect( () => {
    const logout = () => {
      setUserToken('');
      setUser({username:'', firstName:'', lastName:'', email:'', isAdmin:'', applications:[]});
    };

    if (!isLoggedIn) logout();
  }, [isLoggedIn, setUserToken, setUser]);



  const setUserInfo = user => {
    setUser({
      username:     user.username,
      firstName:    user.firstName,
      lastName:     user.lastName,
      email:        user.email,
      isAdmin:      user.isAdmin,
      applications: user.applications
    });
  };

  const resetFormData = (apiMethod) => {
    if(apiMethod === 'logIn') setLoginFormData( { username: '', password: ''} );
    else setSignupFormData( {username: '', password: '', firstName:'', lastName: '', email: ''});
  };

  const handleFormChange = (evt, login=false) => {
    const { name, value } = evt.target;
    if (login) setLoginFormData( data => ({...data, [name]: value}));
    else setSignupFormData(data => ({...data, [name]: value}))
  };

  const handleFormSubmit = async (evt, apiMethod, formInfo) => {
    evt.preventDefault();
    try {
      let token = await JoblyApi[ [apiMethod] ](formInfo);
      setUserToken(token);
      const user_ = await JoblyApi.getUser(formInfo.username);
      setUserInfo(user_);
      setErrorMessage({ login: '', signup: '' });
      resetFormData(apiMethod);
      setIsLoggedIn(true);
      console.log('USER: ', user);
    }catch(err) {
      if (apiMethod === 'logIn') setErrorMessage({login: err, signup: ''});
      else setErrorMessage({login: '', signup: err});
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
            loginFormData={loginFormData}
            signupFormData={signupFormData}
            errorMessage={errorMessage}
          />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
