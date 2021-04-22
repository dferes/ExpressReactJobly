import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import './NavBar.css';

const NavBar = ({ isLoggedIn, setIsLoggedIn, user }) => {
  return (
    <div>
      <Navbar expand='md'>
        <NavLink exact to='/' className='navbar-brand'>Jobly</NavLink>
        {  isLoggedIn &&
        <Nav className='mr-auto'>
          <NavItem className='logged-in-username'>( {user.username} )</NavItem>
        </Nav> 
        }
        <Nav className='ml-auto' navbar>
          {  isLoggedIn &&
            <>
              <NavItem>
                <NavLink to='/companies'>Companies</NavLink>  
              </NavItem>
              <NavItem>
                <NavLink to='/jobs'>Jobs</NavLink>   
              </NavItem>
              <NavItem>
                <NavLink to='/profile'>Profile</NavLink>  
              </NavItem>
              <NavItem>
                <NavLink onClick={ () => setIsLoggedIn(false)} to='/logout'>Log Out</NavLink>  
              </NavItem>
            </>
          }
          { !isLoggedIn &&
            <>
              <NavItem>
                <NavLink to='/login'>Login</NavLink> 
              </NavItem>
              <NavItem>
                <NavLink to='/signup'>Sign Up</NavLink>  
              </NavItem>
            </>
          }
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;