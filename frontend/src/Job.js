import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import FormContext from './FormContext';
import './Job.css';


const Job = ({ id, title, companyHandle, salary, equity, logoUrl }) => {
  const {user, setJobApplyId } = useContext(FormContext);
  return (
    <div className='job-div' key={id}> 
      <p className='job-title'>{title}</p>
      <p className='job-company-handle'>{companyHandle}</p>
      <p className='job-salary'>Salary: ${salary}</p>
      <p className='job-equity'>Equity: {equity? equity: 0}</p>
      {
        !user.applications.includes(id) &&
        <Button onClick={ () => setJobApplyId(id)} className='job-apply-button' >
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