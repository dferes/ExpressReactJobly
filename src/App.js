import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';
import useLocalStorage from './hooks/useLocalStorage';
import JoblyApi from './api';
import FormContext from './FormContext';


function App() {
  const [ companies, setCompanies ] = useState([]);
  const [ jobs, setJobs ] = useState([]);
  const [ loginFormData, setLoginFormData ] = useState({});
  const [ signupFormData, setSignupFormData ] = useState( {} ); 
  const [ userFormData, setUserFormData ] = useState({});
  const [ errorMessage, setErrorMessage ] = useState({});
  const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);
  const [ jobApplyId, setJobApplyId] = useState(''); 

  const [ userToken, setUserToken ] = useLocalStorage('userToken', '');
  const [ user, setUser ] = useLocalStorage('user',  {} );
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
      resetFormData();
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
      if(['logIn', 'signup'].includes(apiMethod)){
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

  /** Makes a post request to the Jobly api to add a job id 
   *  to the logged in user's list of jobs applied to 
   *  (user.jobs) */
  useEffect( () => {
    const apply = async () => {
      JoblyApi.setToken(userToken);
      await JoblyApi.applyToJob( user.username, jobApplyId );  
      setJobApplyId('');

      const user_ = await JoblyApi.getUser(user.username);
      setUser(user_);
    };

    if(jobApplyId!=='') apply();
  }, [jobApplyId, user.username, userToken, setUser ]); 

  
  const formFunctions = {
    user: user,
    handleFormChange: handleFormChange,
    handleFormSubmit: handleFormSubmit,
    loginFormData: loginFormData,
    signupFormData: signupFormData,
    userFormData: userFormData,
    setJobApplyId: setJobApplyId  
  };

  return (
    <div className="App">
      <FormContext.Provider value={formFunctions}>
        <BrowserRouter>
          <NavBar 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn}
          />
          <main>
            <Routes 
              companies={companies} 
              jobs={jobs} 
              userToken={userToken}
              errorMessage={errorMessage}
              showSuccessMessage={showSuccessMessage}
              setShowSuccessMessage={setShowSuccessMessage}
            />
          </main>
        </BrowserRouter>
      </FormContext.Provider>
    </div>
  );
};

export default App;
