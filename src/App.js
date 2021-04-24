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
  const [ userFormData, setUserFormData ] = useState({});
  const [ errorMessage, setErrorMessage ] = useState({});
  const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);

  const [ userToken, setUserToken ] = useLocalStorage('userToken', '');
  const [ user, setUser ] = useLocalStorage('user',  emptyUserData );
  const [ isLoggedIn, setIsLoggedIn ] = useLocalStorage('isLoggedIn', false);
  
 /** Retrieves a list of all companies and all jobs on first render */
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

  /** Logs the user out if isLoggedIn changes to false */
  useEffect( () => {
    const logout = () => {
      setUserToken('');
      setUser({});
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

  const resetFormData = () => {
    setLoginFormData({});
    setSignupFormData({});
    setUserFormData({});
  };

  const handleFormChange = (evt, login=false, signup=false) => {
    const { name, value } = evt.target;
    if (login) setLoginFormData( data => ({...data, [name]: value}) );
    else if(signup)setSignupFormData( data => ({...data, [name]: value}) );
    else setUserFormData( data => ({...data, [name]: value}) );
  };

  const handleFormSubmit = async (evt, apiMethod, formInfo) => {
    evt.preventDefault();
    try {
      if(['logIn', 'submit'].includes(apiMethod)){
        const token = await JoblyApi[ [apiMethod] ](formInfo);
        setUserToken(token);
      }else {
        JoblyApi.setToken(userToken);
        await JoblyApi[ [apiMethod] ](formInfo);
      }
      const user_ = await JoblyApi.getUser(formInfo.username);
      setUserInfo(user_);
      resetFormData();
      setErrorMessage({});
      setShowSuccessMessage(true);
      setIsLoggedIn(true);
    }catch(err) { setErrorMessage({ [apiMethod]: err }); }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar 
          isLoggedIn={isLoggedIn} 
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
            isLoggedIn={isLoggedIn}
            user={user}
            loginFormData={loginFormData}
            signupFormData={signupFormData}
            userFormData={userFormData}
            errorMessage={errorMessage}
            showSuccessMessage={showSuccessMessage}
            setShowSuccessMessage={setShowSuccessMessage}
          />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
