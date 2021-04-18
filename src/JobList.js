import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './JobList.css';


const JobList = ({ jobs }) => {

  return (
    <div>
      {jobs.map( job => (
        <Link className='job-link' to={`/jobs/${job.id}`} key={job.id}>
          <div className='job-div'> 
            <p className='job-title'>{job.title}</p>
            <p className='job-company-handle'>{job.companyHandle}</p>
            {/* <img className='company-image' src={comp.logoUrl} alt=''/> */}
            <p className='job-salary'>Salary: ${job.salary}</p>
            <p className='job-equity'>Equity: {job.equity? job.equity: 0}</p>
            <Button className='job-apply-button' color='danger'>Apply</Button>
          </div>  
        </Link>  
      ))}  
    </div>  
  );
};

export default JobList;