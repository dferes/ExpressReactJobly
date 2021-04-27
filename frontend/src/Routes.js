import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import CompanyList from './CompanyList';
import JobList from './JobList';
import Profile from './Profile';
import Signup from './Signup';
import Login from './Login';
import CompanyDetails from './CompanyDetails';


const Routes = ({ companies, jobs, errorMessage, showSuccessMessage, setShowSuccessMessage }) => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/companies'>
        <CompanyList companies={companies} />
      </Route>
      <Route exact path='/companies/:handle'>
        <CompanyDetails />
      </Route>
      <Route exact path='/jobs'>
        <JobList jobs={jobs} />
      </Route>
      <Route exact path='/profile'>
        <Profile 
          errorMessage={errorMessage}
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage} 
        />
      </Route>
      <Route exact path='/signup'>
        <Signup errorMessage={errorMessage} />
      </Route>
      <Route exact path='/login'>
        <Login errorMessage={errorMessage} />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
};

export default Routes;