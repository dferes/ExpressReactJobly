import React, { useState } from 'react';
import Job from './Job';
import JoblyApi from './api';
import { Button } from 'reactstrap';
import './JobList.css';


const JobList = ({ jobs }) => {

  const [ formData2, setFormData2 ] = useState({ title: ''});
  const [ jobList, setJobList ] = useState(jobs);
  const [ isEmpty, setIsEmpty ] = useState(false);
  
  const handleChange2 = evt => {
    const { name, value } = evt.target;  
    setFormData2( data => ({...data, [name]: value}));
  };
  
  const handleSubmit2 = async evt => {
    evt.preventDefault();  
    const res = formData2.title !== '' ?
      await JoblyApi.getAllJobs(formData2)
      : jobs;
    setIsEmpty( res.length === 0 ? true: false); 
    setJobList(res);
    console.log('----->>><<< The RESULT IS: ', res);
  };

  return (
    <div>
      <div className='job-form-div'>
        <form onSubmit={handleSubmit2}>
          <label htmlFor='job-title-search' />
          <input 
            className='job-title-search-input'
            id='job-title-search'
            name='title'
            placeholder='Enter a serch term...'
            value={formData2.title}
            onChange={handleChange2}
          />
          <Button className='job-title-search-button' color='primary'>Submit</Button>    
        </form>
      </div>    
      { !isEmpty && jobList.map( job => (
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