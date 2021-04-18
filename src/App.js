import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
