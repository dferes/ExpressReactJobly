import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import './NavBar.css';

const NavBar = ({ isLoggedIn=false }) => {
  return (
    <div>
      <Navbar expand='md'>
        <NavLink exact to='/' className='navbar-brand'>Jobly</NavLink>
        <Nav className='ml-auto' navbar>
          {  isLoggedIn &&
            <NavItem>
              <NavLink to='/companies'>Companies</NavLink>  
            </NavItem>
          }
          {  isLoggedIn &&
            <NavItem>
              <NavLink to='/jobs'>Jobs</NavLink>   
            </NavItem>
          }
          {  isLoggedIn &&
            <NavItem>
              <NavLink to='/profile'>Profile</NavLink>  
            </NavItem>
          }
          { !isLoggedIn &&
            <NavItem>
              <NavLink to='/login'>Login</NavLink> 
            </NavItem>
          }
          { !isLoggedIn &&
            <NavItem>
              <NavLink to='/signup'>Sign Up</NavLink>  
            </NavItem>
          }
          { isLoggedIn &&
            <NavItem>
              <NavLink to='/logout'>Log Out</NavLink>  
            </NavItem>
          }
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;