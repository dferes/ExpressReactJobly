import React, { useState } from 'react';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import JoblyApi from './api';
import './Login.css';


const Login = ({ setUserToken, setIsLoggedIn, setUser  }) => {
  const [ formData, setFormData ] = useState({ username: '', password: ''});
  const [ validCredentials, setValidCredentials ] = useState(true);
  const history = useHistory();

  const setUserInfo = user => {
    setUser({
      username:     user.username,
      firstName:    user.firstName,
      lastName:     user.lastName,
      email:        user.email,
      isAdmin:      user.isAdmin,
      applications: user.applications
    });
  }

  const handleLoginChange = evt => {
    const { name, value } = evt.target;
    setFormData( data => ({...data, [name]: value}));
  };

  const handleLoginSubmit = async evt => {
    evt.preventDefault();
    try {
      let token = await JoblyApi.logIn(formData.username, formData.password);
      setUserToken(token);
      setValidCredentials(true);
     
      const user = await JoblyApi.getUser(formData.username);
      setUserInfo(user);
      setIsLoggedIn(true);
      history.push('/');
    }catch(err) {
      setValidCredentials(false);
    }

  };

  return (
    <div className='login-form-div'>
      <h2 className='login-message' >Log In</h2>  
      <Form className='login-form' onSubmit={handleLoginSubmit}>
        <FormGroup>
          <Label for='username'>Username</Label>
            <Input
              autoFocus 
              type='text'
              name='username'
              id='username'
              value={formData.username}
              onChange={handleLoginChange}  
            />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
            <Input 
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleLoginChange}  
            />
        </FormGroup>
        { !validCredentials && 
          <div className='bad-login-div'>
            <p className='bad-login-message'>Invalid username/password</p>
          </div>      
        }
        <Button color='primary' className='login-button'>Log In</Button>
      </Form>
    </div>  
  );  
}

export default Login;