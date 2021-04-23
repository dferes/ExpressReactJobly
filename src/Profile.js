import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import './Profile.css';

const Profile = ({ errorMessage, user, userFormData, handleFormChange, handleFormSubmit }) => {
  const [ redirect, setRedirect ] = useState(false);
  const history = useHistory();
  if(!user.username || (!errorMessage.update && redirect) ) history.push('/');

  const handleUpdateChange = evt => handleFormChange(evt, false, false);
  const handleUpdateSubmit = evt => {
    handleFormSubmit(evt, 'update', {...userFormData, username: user.username});
    setRedirect(true);
  };
    
  return (
    <div className='user-profile-div'>
      <h2 className='user-profile-message'>Profile</h2>
      <Form onSubmit={handleUpdateSubmit} className='user-profile-form'>
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
            value={userFormData.firstName}
            onChange={handleUpdateChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label for='lastName'>Last Name</Label>
          <Input
            type='text'
            name='lastName'
            id='lastName'
            placeholder={user.lastName}
            value={userFormData.lastName}
            onChange={handleUpdateChange}  
          />
          </FormGroup>  
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder={user.email}
            value={userFormData.email}
            onChange={handleUpdateChange}  
          />
        </FormGroup>
        <FormGroup>
          <Label for='password-confirm'>Confirm Password</Label>
          <Input
            required='true'
            type='password'
            name='password'
            id='password'
            value={userFormData.password}
            onChange={handleUpdateChange}  
          />
        </FormGroup>
        { errorMessage.update && 
          <div className='bad-update-div'>
            <p className='bad-update-message'>{errorMessage.update}</p>
          </div>      
        }
        <Button className='user-profile-button' color='primary'>Save Changes</Button>   
      </Form>
    </div>   
  );
};

export default Profile;