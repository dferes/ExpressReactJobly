import React, { useState } from 'react';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import JoblyApi from './api';
import './Login.css';


const Login = () => {
  const [ formData, setFormData ] = useState({ username: '', password: ''});

  const handleLoginChange = evt => {
    const { name, value } = evt.target;
    setFormData( data => ({...data, [name]: value}));
  };

  const handleLoginSubmit = async evt => {
    evt.preventDefault();
    let res = await JoblyApi.logIn(formData.username, formData.password,);
    console.log('Login Response: ----->', res);
    // probaly redirect from here if response isn't an error...either hompage or profile
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
        <Button color='primary' className='login-button'>Log In</Button>
      </Form>
    </div>  
  );  
}

export default Login;