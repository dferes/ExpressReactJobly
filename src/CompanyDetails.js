import React, { useEffect, useState } from 'react';
import Job from './Job';
import { useParams, useHistory } from 'react-router-dom';
import JoblyApi from './api';
import './CompanyDetails.css';

const CompanyDetails = ({ isLoggedIn }) => {
  const history = useHistory();
  if(!isLoggedIn) history.push('/');

  const [ company, setCompany ] = useState({});
  const [ readyToRender, setReadyToRender ] = useState(false);
  const [ noCompanyFound, setNoCompanyFound ] = useState(false);
  const { handle } = useParams();
  
  useEffect( () => {
    const getCompanyJobs = async () => {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
        setReadyToRender(true);
      }catch(err) {
        setNoCompanyFound(true);
      }
    };
    
    getCompanyJobs();
  }, [handle]);
  
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
          isLoggedIn={isLoggedIn}
        />  
      ))}
      {  noCompanyFound && 
        <div>
          <h3>No Company found with handle: {handle} </h3>
       </div> 
      }
    </div>
  );  
};

export default CompanyDetails;