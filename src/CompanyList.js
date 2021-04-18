import React from 'react';
import './CompanyList.css';
import { Link } from 'react-router-dom';


const CompanyList = ({ companies }) => {
  return (  
    <div>
      {companies.map( comp => (
        <Link className='company-link' to={`/companies/${comp.handle}`} key={comp.handle}>
          <div className='company-div'> 
            <p className='company-name'>{comp.name}</p>
            {/* <img className='company-image' src={comp.logoUrl} alt=''/> */}
            <p className='company-description'>{comp.description}</p> 
          </div>  
        </Link>  
      ))}  
    </div>  
  );
};

export default CompanyList;