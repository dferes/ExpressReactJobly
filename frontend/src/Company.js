import React from 'react';
import { Link } from 'react-router-dom';
import './Company.css';


const Company = ({ handle, name, description, logoUrl }) => {
  return (
    <Link className='company-link' to={`/companies/${handle}`}>
      <div className='company-div'> 
        <p className='company-name'>{name}</p>
        <img className='company-image' src={logoUrl} alt=''/>
        <p className='company-description'>{description}</p> 
      </div>  
    </Link>  
  );  
};

export default Company;