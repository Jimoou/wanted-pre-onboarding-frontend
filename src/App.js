import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Register } from "./Pages/Register/Register"
import { Login } from "./Pages/Login/Login"
import { Navbar } from './Pages/Navbar/Navbar';

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <div className='main'>
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
