import React, { useState } from 'react';
import './CompanyList.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import JoblyApi from './api';


const CompanyList = ({ companies }) => {
  const [ formData, setFormData ] = useState({ name: ''});
  const [ companyList, setCompanyList ] = useState(companies);
  const [ isEmpty, setIsEmpty ] = useState(false);
  
  const handleChange = evt => {
    const { name, value } = evt.target;  
    setFormData( data => ({...data, [name]: value}));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();  
    const res = formData.name !== '' ?
      await JoblyApi.getAllCompanies(formData)
      : companies;
    setIsEmpty( res.length === 0 ? true: false); 
    setCompanyList(res);
  };
  
  return (  
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='company-name-search' />
        <input 
          className='company-name-search-input'
          id='company-name-search'
          name='name'
          placeholder='Enter a serch term...'
          value={formData.name}
          onChange={handleChange}
        />
        <Button className='company-name-search-button' color='primary'>Submit</Button>    
      </form>

      { !isEmpty && companyList.map( comp => (
        <Link className='company-link' to={`/companies/${comp.handle}`} key={comp.handle}>
          <div className='company-div'> 
            <p className='company-name'>{comp.name}</p>
            {/* <img className='company-image' src={comp.logoUrl} alt=''/> */}
            <p className='company-description'>{comp.description}</p> 
          </div>  
        </Link>  
      ))}  
      { isEmpty && <p className='no-results-msg'>Sorry, no results were found!</p>

      }
    </div>  
  );
};

export default CompanyList;