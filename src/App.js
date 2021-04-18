import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';
import JoblyApi from './api';

function App() {
  const [ companies, setCompanies ] = useState([]);
  const [ jobs, setJobs ] = useState([]);
  
  useEffect( () => {
    const getCompanies = async () => {
      const allCompanies = await JoblyApi.getAllCompanies();
      setCompanies(allCompanies);
    }

    const getJobs = async () => {
      const allJobs = await JoblyApi.getAllJobs();
      setJobs(allJobs);
    }

    getCompanies();
    getJobs();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes companies={companies} jobs={jobs} />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
