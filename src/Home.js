import React from 'react';
import './Home.css';
import { Button } from 'reactstrap';

const Home = ({ isLoggedIn=false }) => {
// TODO:  will need to include logged in user's name in the welcome back message
  return (
    <section>
      <div className='jobly-welcome-div'>
        <h1 className='jobly-welcome-title'>Jobly</h1>
        <h3 className='jobly-welcome-message'>All the jobs in one, convenient place.</h3>
        { !isLoggedIn &&
          <Button color='primary' className='login-button'>Login</Button>
        }    
        { !isLoggedIn &&
          <Button color='primary' className='signup-button'>Signup</Button>
        } 
        {
          isLoggedIn && <h2>Welcome Back, {}!</h2>  
        }  
      </div>  
    </section>
  );
};

export default Home;