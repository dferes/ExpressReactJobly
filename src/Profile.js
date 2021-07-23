import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FormContext from './FormContext';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import './Profile.css';

const Profile = ({ errorMessage, showSuccessMessage, setShowSuccessMessage }) => {
  const history = useHistory();
  const { user, userFormData, handleFormChange, handleFormSubmit } = useContext(FormContext);
  if(!user.username) history.push('/');

  const [ successfulUpdate, setSuccessfulUpdate ] = useState(showSuccessMessage);
  
  const handleUpdateChange = evt => handleFormChange(evt, false, false);
  const handleUpdateSubmit = evt => {
    handleFormSubmit(evt, 'update', {...userFormData, username: user.username});
  };
  

  useEffect( () => {
    setSuccessfulUpdate(showSuccessMessage);

    const timeout = setTimeout( () => {
      setShowSuccessMessage(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [showSuccessMessage, setShowSuccessMessage]);
    

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
            required={true}
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
        { successfulUpdate && 
          <div className='success-update-div'>
            <p className='success-update-message'>Your changes have been saved!</p>
          </div>      
        }
        <Button className='user-profile-button' color='primary'>Save Changes</Button>   
      </Form>
    </div>   
  );
};

export default Profile;