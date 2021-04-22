import React from 'react';
import { useHistory, useEffect, useSate } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import './Profile.css';

const Profile = ({ user }) => {
  const history = useHistory();
  if(!user.username) history.push('/');
    
  return (
    <div className='user-profile-div'>
      <h2 className='user-profile-message'>Profile</h2>
      <Form className='user-profile-form'>
        <FormGroup>
          <p className='username-display'>Username</p>
          <p className='username-value'>{user.username}</p>
        </FormGroup>
        <FormGroup>
          <Label for='firstName'>First Name</Label>
            <Input
              type='text'
              name='firstName'
              id='firstName'
              placeholder={user.firstName}
              // value={}
              // onChange={}  
            />
        </FormGroup>
        <FormGroup>
          <Label for='lastName'>Last Name</Label>
            <Input
              type='text'
              name='lastName'
              id='lastName'
              placeholder={user.lastName}
              // value={}
              // onChange={}  
            />
          </FormGroup>  
        <FormGroup>
          <Label for='email'>Email</Label>
            <Input
              type='email'
              name='email'
              id='email'
              placeholder={user.email}
              // value={}
              // onChange={}  
            />
        </FormGroup>
        <FormGroup>
          <Label for='password-confirm'>Confirm Password</Label>
            <Input
              type='password'
              name='password'
              id='password'
              // value={}
              // onChange={}  
            />
        </FormGroup>
        <Button className='user-profile-button' color='primary'>Save Changes</Button>   
      </Form>
    </div>   
  );
};

export default Profile;