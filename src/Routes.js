import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import CompanyList from './CompanyList';
import JobList from './JobList';
import Profile from './Profile';
import Signup from './Signup';
import Login from './Login';
import CompanyDetails from './CompanyDetails';


const Routes = ({ 
  companies, 
  jobs, 
  handleFormChange, 
  handleFormSubmit, 
  isLoggedIn,
  user, 
  loginFormData, 
  signupFormData,
  userFormData,
  errorMessage,
  showSuccessMessage,
  setShowSuccessMessage,
  setJobAppyId
}) => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home isLoggedIn={isLoggedIn} user={user} />
      </Route>
      <Route exact path='/companies'>
        <CompanyList companies={companies} isLoggedIn={isLoggedIn}/>
      </Route>
      <Route exact path='/companies/:handle'>
        <CompanyDetails 
          isLoggedIn={isLoggedIn}
          setJobAppyId={setJobAppyId}
          user={user}  
        />
      </Route>
      <Route exact path='/jobs'>
        <JobList jobs={jobs} 
          isLoggedIn={isLoggedIn} 
          setJobAppyId={setJobAppyId}
          user={user}  
        />
      </Route>
      <Route exact path='/profile'>
        <Profile 
          user={user}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          userFormData={userFormData}
          errorMessage={errorMessage}
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage} 
        />
      </Route>
      <Route exact path='/signup'>
        <Signup 
          signupFormData={signupFormData}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          errorMessage={errorMessage}
          isLoggedIn={isLoggedIn}
        />
      </Route>
      <Route exact path='/login'>
        <Login 
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          loginFormData={loginFormData}
          errorMessage={errorMessage}
          isLoggedIn={isLoggedIn}
        />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
};

export default Routes;