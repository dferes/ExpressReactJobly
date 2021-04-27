import React, { useContext } from 'react';
import FormContext from './FormContext';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Signup.css';


const Signup = ({ errorMessage }) => {
  const history = useHistory();
  const {user, signupFormData, handleFormChange, handleFormSubmit} = useContext(FormContext);
  if ( !errorMessage.signup && user.username ) history.push('/');

  const handleSignupChange = evt => handleFormChange(evt, false, true);
  const handleSignupSubmit = evt => handleFormSubmit(evt, 'signup', signupFormData);


  return (
    <div className='signup-form-div'>
      <h2 className='signup-message'>Sign Up</h2>
      <Form onSubmit={handleSignupSubmit} className='signup-form'>
        <FormGroup>
          <Label for='username'>Username</Label>
            <Input 
              autoFocus
              type='text'
              name='username'
              id='username'
              value={signupFormData.username}
              onChange={handleSignupChange}  
            />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
            <Input 
              type='password'
              name='password'
              id='password'
              value={signupFormData.password}
              onChange={handleSignupChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label for='firstName'>First Name</Label>
            <Input  
              type='text'
              name='firstName'
              id='firstName'
              value={signupFormData.firstName}
              onChange={handleSignupChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='lastName'>Last Name</Label>
            <Input 
              type='text'
              name='lastName'
              id='lastName'
              value={signupFormData.lastName}
              onChange={handleSignupChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>Email</Label>
            <Input 
              type='email'
              name='email'
              id='email'
              value={signupFormData.email}
              onChange={handleSignupChange}
            />
        </FormGroup>
        { errorMessage.signup && 
          <div className='bad-signup-div'>
            <p className='bad-signup-message'>{errorMessage.signup}</p>
          </div>      
        }
        <Button color='primary' className='signup-form-button'>Sign Up</Button>
      </Form>
    </div>  
  );  
}

export default Signup;