import React from 'react';
import { useHistory } from 'react-router-dom';
import Job from './Job';
import useInputFilter from './hooks/useInputFilter';
import { Button } from 'reactstrap';
import './JobList.css';


const JobList = ({ jobs, isLoggedIn }) => {
  const history = useHistory();
  console.log('isLoggedIn: ', isLoggedIn);
  if(!isLoggedIn) history.push('/');

  const [ 
    resultList, 
    filter, 
    handleChange, 
    handleSubmit, 
    isEmpty 
  ] = useInputFilter({ defaultList: jobs, apiMethod: 'getAllJobs', termKey: 'title'} );

  return (
    <div>
      <div className='job-form-div'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='job-title-search' />
          <input 
            className='job-title-search-input'
            id='job-title-search'
            name='title'
            placeholder='Enter a serch term...'
            value={filter.title}
            onChange={handleChange}
          />
          <Button className='job-title-search-button' color='primary'>Submit</Button>    
        </form>
      </div>    
      { !isEmpty && resultList.map( job => (
        <Job 
          key={job.id}
          id={job.id}
          title={job.title}
          companyHandle={job.companyHandle}
          salary={job.salary}
          equity={job.equity}
        />
      ))}
      { isEmpty && <p className='no-results-msg'>Sorry, no results were found!</p> }  
    </div>  
  );
};

export default JobList;