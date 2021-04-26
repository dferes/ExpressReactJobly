import React from 'react';
import './Home.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn, user }) => {
  return (
    <section>
      <div className='jobly-welcome-div'>
        <h1 className='jobly-welcome-title'>Jobly</h1>
        <h3 className='jobly-welcome-message'>All the jobs in one, convenient place.</h3>
        { !isLoggedIn &&
          <div>
            <Link exact to='/login'>
              <Button color='primary' className='homepage-login-button'>Login</Button>
            </Link>
            <Link exact to='/signup'>
              <Button color='primary' className='homepage-signup-button'>Signup</Button>
            </Link>
          </div>
        }    
        {
          isLoggedIn && <h2 className='jobly-hello-message'>Welcome Back, {user.firstName}!</h2>  
        }  
      </div>  
    </section>
  );
};

export default Home;