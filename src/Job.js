import React from 'react';
import { Button } from 'reactstrap';
import './Job.css';


const Job = ({ id, title, companyHandle, salary, equity }) => {
  return (
    <div className='job-div' key={id}> 
      <p className='job-title'>{title}</p>
      <p className='job-company-handle'>{companyHandle}</p>
      {/* <img className='company-image' src={comp.logoUrl} alt=''/> */}
      <p className='job-salary'>Salary: ${salary}</p>
      <p className='job-equity'>Equity: {equity? equity: 0}</p>
      <Button className='job-apply-button' color='danger'>Apply</Button>
  </div>  
  );  
}

export default Job;