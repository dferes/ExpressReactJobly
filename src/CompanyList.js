import React, { useState } from 'react';
import './CompanyList.css';
import { Button } from 'reactstrap';
import Company from './Company';
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
      <div className='form-div'>
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
      </div>  
      { !isEmpty && companyList.map( comp => (
        <Company 
          key={comp.handle}
          handle={comp.handle}
          name={comp.handle}
          description={comp.description}  
          logoUrl={comp.logoUrl}
        /> 
      ))}  
      { isEmpty && <p className='no-results-msg'>Sorry, no results were found!</p> }
    </div>  
  );
};

export default CompanyList;