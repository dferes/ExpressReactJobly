import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import CompanyList from './CompanyList';
import JobList from './JobList';
import Profile from './Profile';
import Signup from './Signup';
import Login from './Login';
import CompanyDetails from './CompanyDetails';
import Job from './Job';


const Routes = ({ 
  companies, 
  jobs, 
  handleLoginChange, 
  handleLoginSubmit, 
  userToken, 
  user, 
  formData, 
  validCredentials,
  signupFormData,
  handleSignupChange,
  handleSignupSubmit,
  errorMessage
}) => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home userToken={userToken} user={user} />
      </Route>
      <Route exact path='/companies'>
        <CompanyList companies={companies}/>
      </Route>
      <Route exact path='/companies/:handle'>
        <CompanyDetails />
      </Route>
      <Route exact path='/jobs'>
        <JobList jobs={jobs} />
      </Route>
      <Route exact path='/jobs/:id'>
        <Job jobs={jobs} />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route exact path='/signup'>
        <Signup 
          signupFormData={signupFormData}
          handleSignupChange={handleSignupChange}
          handleSignupSubmit={handleSignupSubmit}
          errorMessage={errorMessage}
          userToken={userToken}
        />
      </Route>
      <Route exact path='/login'>
        <Login 
          handleLoginChange={handleLoginChange}
          handleLoginSubmit={handleLoginSubmit}
          formData={formData}
          validCredentials={validCredentials}
          userToken={userToken}
        />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
};

export default Routes;