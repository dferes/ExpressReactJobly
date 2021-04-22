import React from 'react';
import './CompanyList.css';
import { Button } from 'reactstrap';
import Company from './Company';
import { useHistory } from 'react-router-dom';
import useInputFilter from './hooks/useInputFilter';

const CompanyList = ({ companies, isLoggedIn }) => {
  const history = useHistory();
  console.log('isLoggedIn: ', isLoggedIn);
  if(!isLoggedIn) history.push('/');
  
  const [ 
    resultList, 
    filter, 
    handleChange, 
    handleSubmit, 
    isEmpty 
  ] = useInputFilter({ defaultList: companies, apiMethod: 'getAllCompanies', termKey: 'name'} );
  
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
            value={filter.name}
            onChange={handleChange}
          />
          <Button className='company-name-search-button' color='primary'>Submit</Button>    
        </form>
      </div>  
      { !isEmpty && resultList.map( comp => (
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