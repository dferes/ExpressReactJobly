import React, { useEffect, useState } from 'react';
import Job from './Job';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import './CompanyDetails.css';

const CompanyDetails = () => {
  const [ company, setCompany ] = useState({});
  const [ readyToRender, setReadyToRender ] = useState(false);
  const { handle } = useParams();
  
  useEffect( () => {
    const getCompanyJobs = async () => {
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
      setReadyToRender(true);
    };
    
    getCompanyJobs();
  }, [handle]); // double check this
  
  return (
    <div className='company-jobs-div'>
      { readyToRender && 
        <div className='company-details-div'>
          <h4 className='company-details-title'>{company.name}</h4>
          <p className='company-details-description'>{company.description}</p>
        </div>  
      }  
      { readyToRender && company.jobs.map( job => (
        <Job 
          key={job.id}
          id={job.id}
          title={job.title}
          companyHandle={company.handle}
          salary={job.salary}
          equity={job.equity}
        />  
      ))}
    </div>
  );  
};

export default CompanyDetails;