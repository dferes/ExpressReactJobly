import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import CompanyList from './CompanyList';
import JobList from './JobList';
import Profile from './Profile';
import Signup from './Signup';
import Login from './Login';

// will need a lot more routes; this will suffice for now

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/companies'>
        <CompanyList />
      </Route>
      <Route exact path='/jobs'>
        <JobList />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route exact path='/signup'>
        <Signup />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      {/* should probably use useState for logging out, probaly don't need a component for that one... */}
      <Redirect to='/' />
    </Switch>
  );
};

export default Routes;