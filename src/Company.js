import React from 'react';
import { useParams } from 'react-router-dom';


const Company = ({ companies }) => {
  const { handle } = useParams();
  const company = companies.find( com => handle === com.handle);

  return (
    <div className='company-div'>
    <h2>{ company.name }</h2>
    </div>  
  );  
};

export default Company;