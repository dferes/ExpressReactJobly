import React from 'react';
import { Link } from 'react-router-dom';

const JobList = ({ jobs }) => {

  return (
    <div>
      <h2>jobList, bruh</h2>
      {jobs.map( job => (
        <div key={job.id}> 
          <p>{job.id}</p>
          <Link to={`/jobs/${job.id}`}>{job.title}</Link>   
        </div>  
      ))}  
    </div>  
  );
};

export default JobList;