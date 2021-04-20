import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Signup.css';


const Signup = () => {
  return (
    <div className='signup-form-div'>
      <h2 className='signup-message'>Sign Up</h2>
      <Form className='signup-form'>
        <FormGroup>
          <Label for='username'>Username</Label>
            <Input 
              autoFocus 
              type='text'
              name='username'
              id='username'
              // value={formData.username}
              // onChange={handleLoginChange}  
            />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
            <Input 
              type='password'
              name='password'
              id='password'
              // value={formData.username}
              // onChange={handleLoginChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label for='firstName'>First Name</Label>
            <Input  
              type='text'
              name='firstName'
              id='firstName'
              // value={formData.username}
              // onChange={handleLoginChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label for='lastName'>Last Name</Label>
            <Input 
              type='text'
              name='lastName'
              id='lastName'
              // value={formData.username}
              // onChange={handleLoginChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>Email</Label>
            <Input 
              type='email'
              name='email'
              id='email'
              // value={formData.username}
              // onChange={handleLoginChange}  
            />
        </FormGroup>
        <Button color='primary' className='signup-form-button'>Sign Up</Button>
      </Form>
    </div>  
  );  
}

export default Signup;