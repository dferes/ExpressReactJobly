import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';
import useLocalStorage from './hooks/useLocalStorage';
import JoblyApi from './api';

// TODO: Use 'useContext' to pass all major props

function App() {
  const emptyUserData = {username: '', firstName: '', lastName: '', email: '', isAdmin: '', applications: []}; // Necessary
  const [ companies, setCompanies ] = useState([]); // useLocalStorage ??
  const [ jobs, setJobs ] = useState([]);  // useLocalStorage ??

  const [ loginFormData, setLoginFormData ] = useState({ username: '', password: ''}); // Necessary?? // possible to use one piece of state for all form data??
  const [ signupFormData, setSignupFormData ] = useState( emptyUserData ); // Necessary  // possible to use one piece of state for all form data??
  const [ userFormData, setUserFormData ] = useState({}); // possible to use one piece of state for all form data??  
  const [ errorMessage, setErrorMessage ] = useState({});
  const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);
  const [ jobApplyId, setJobAppyId] = useState(''); 

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
      setUser(user_);
      resetFormData();
      setErrorMessage({});
      setShowSuccessMessage(apiMethod==='update'? true: false);
      setIsLoggedIn(true);
    }catch(err) { setErrorMessage({ [apiMethod]: err }); }
  };

  
  useEffect( () => {
    const apply = async () => {
      JoblyApi.setToken(userToken);
      await JoblyApi.applyToJob( user.username, jobApplyId );  
      setJobAppyId('');

      const user_ = await JoblyApi.getUser(user.username);
      setUser(user_);
    };

    if(jobApplyId!=='') apply();
  }, [jobApplyId, user.username, userToken, setUser ]); 

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
            setJobAppyId={setJobAppyId}
          />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
