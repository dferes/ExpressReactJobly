import React from 'react';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './Login.css';


const Login = ({ handleFormSubmit, handleFormChange, loginFormData, isLoggedIn, errorMessage  }) => {
  const history = useHistory();
  if(!errorMessage.login && isLoggedIn)  history.push('/');

  const handleLoginChange = evt => handleFormChange(evt, true);
  const handleLoginSubmit = evt => handleFormSubmit(evt, 'logIn', loginFormData);

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
              value={loginFormData.username}
              onChange={handleLoginChange}  
            />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
            <Input 
              type='password'
              name='password'
              id='password'
              value={loginFormData.password}
              onChange={handleLoginChange}  
            />
        </FormGroup>
        { errorMessage.login && 
          <div className='bad-login-div'>
            <p className='bad-login-message'>{errorMessage.login}</p>
          </div>      
        }
        <Button color='primary' className='login-button'>Log In</Button>
      </Form>
    </div>  
  );  
}

export default Login;