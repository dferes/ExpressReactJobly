import React from 'react';

const CompanyList = ({ companies }) => {

  return (
    <div>
      <h2>companyList, mang</h2>
      {companies.map( com => (
        <div key={com.handle}> 
          <p>{com.handle}</p> 
        </div>  
      ))}  
    </div>  
  );
};

export default CompanyList;