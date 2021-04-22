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
  handleFormChange, 
  handleFormSubmit, 
  userToken, 
  user, 
  formData, 
  validCredentials,
  signupFormData,
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
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          errorMessage={errorMessage}
          userToken={userToken}
        />
      </Route>
      <Route exact path='/login'>
        <Login 
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          formData={formData}
          errorMessage={errorMessage}
          validCredentials={validCredentials}
          userToken={userToken}
        />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
};

export default Routes;