import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import './NavBar.css';

const NavBar = ({ userToken, setIsLoggedIn, user }) => {
  return (
    <div>
      <Navbar expand='md'>
        <NavLink exact to='/' className='navbar-brand'>Jobly</NavLink>
        {  userToken &&
        <Nav className='mr-auto'>
          <NavItem className='logged-in-username'>( {user.username} )</NavItem>
        </Nav> 
        }
        <Nav className='ml-auto' navbar>
          {  userToken &&
            <NavItem>
              <NavLink to='/companies'>Companies</NavLink>  
            </NavItem>
          }
          {  userToken &&
            <NavItem>
              <NavLink to='/jobs'>Jobs</NavLink>   
            </NavItem>
          }
          {  userToken &&
            <NavItem>
              <NavLink to='/profile'>Profile</NavLink>  
            </NavItem>
          }
          { !userToken &&
            <NavItem>
              <NavLink to='/login'>Login</NavLink> 
            </NavItem>
          }
          { !userToken &&
            <NavItem>
              <NavLink to='/signup'>Sign Up</NavLink>  
            </NavItem>
          }
          { userToken &&
            <NavItem>
              <NavLink onClick={ () => setIsLoggedIn(false)} to='/logout'>Log Out</NavLink>  
            </NavItem>
          }
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;