import React from 'react';
import './JobList.css';
import Job from './Job';

const JobList = ({ jobs }) => {

//   const [ formData, setFormData ] = useState({ name: ''});
//   const [ jobList, setJobList ] = useState(companies);
//   const [ isEmpty, setIsEmpty ] = useState(false);
    
//   const handleChange = evt => {
//     const { name, value } = evt.target;  
//     setFormData( data => ({...data, [name]: value}));
//   };
  
//   const handleSubmit = async evt => {
//     evt.preventDefault();  
//     const res = formData.name !== '' ?
//       await JoblyApi.getAllCompanies(formData)
//       : companies;
//     setIsEmpty( res.length === 0 ? true: false); 
//     setCompanyList(res);
//   };

  return (
    <div>
      {jobs.map( job => (
        <Job 
          key={job.id}
          id={job.id}
          title={job.title}
          companyHandle={job.companyHandle}
          salary={job.salary}
          equity={job.equity}
        />
      ))}  
    </div>  
  );
};

export default JobList;