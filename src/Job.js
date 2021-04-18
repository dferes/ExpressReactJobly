import React from 'react';
import { useParams } from 'react-router-dom';
import './Job.css';


const Job = ({ jobs }) => {
  const { id } = useParams();
  const job = jobs.find( jb => +id === jb.id);

  return (
    <div>
      <h2 className='a-job-title'>{job.title}</h2>
      <p className='a-job-salary'>Salary: ${job.salary}</p>
      <p className='a-job-equity'> Equity: {job.equity}</p>
    </div>  
  );  
}

export default Job;