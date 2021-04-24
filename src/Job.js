import React from 'react';
import { Button } from 'reactstrap';
import './Job.css';


const Job = ({ user, id, title, companyHandle, salary, equity, setJobAppyId }) => {
  return (
    <div className='job-div' key={id}> 
      <p className='job-title'>{title}</p>
      <p className='job-company-handle'>{companyHandle}</p>
      {/* <img className='company-image' src={comp.logoUrl} alt=''/> */}
      <p className='job-salary'>Salary: ${salary}</p>
      <p className='job-equity'>Equity: {equity? equity: 0}</p>
      {
        !user.applications.includes(id) &&
        <Button onClick={ () => setJobAppyId(id)} className='job-apply-button' >
          Apply
        </Button>
      }
      { user.applications.includes(id) &&
        <Button className='job-apply-button'>Applied</Button>
      }
  </div>  
  );  
}

export default Job;