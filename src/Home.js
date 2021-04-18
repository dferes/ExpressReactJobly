import React from 'react';
import './Home.css';
import { Button } from 'reactstrap';

const Home = () => {

  return (
    <section>
      <div className='jobly-welcome-div'>
        <h1 className='jobly-welcome-title'>Jobly</h1>
        <h3 className='jobly-welcome-message'>All the jobs in one, convenient place.</h3>
        <Button color='primary' className='login-button'>Login</Button>
        <Button color='primary' className='signup-button'>Signup</Button>
      </div>  
    </section>
  );
};

export default Home;