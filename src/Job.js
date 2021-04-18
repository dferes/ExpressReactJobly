import React from 'react';
import { useParams } from 'react-router-dom';


const Job = ({ jobs }) => {
  const { id } = useParams();
  const job = jobs.find( jb => +id === jb.id);

  return (
    <div>
      <h2>{job.title}</h2>
      <p>Salary: ${job.salary}</p>
      <p>Equity: {job.equity}</p>
    </div>  
  );  
}

export default Job;