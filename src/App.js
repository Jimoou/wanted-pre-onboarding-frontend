import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import React from 'react';
import { Register } from "./Pages/Register/Register"
import { Login } from "./Pages/Login/Login"
import { Navbar } from './Pages/Navbar/Navbar';
import { TodoList } from './Pages/TodoList/TodoList';

function App() {
  const accessToken = localStorage.getItem("JWT");

  return (
    <div>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Navigate replace to="/todo"/>}/>
          {accessToken ?
          <>
          <Route path="/signin" element={<Navigate replace to="/todo" />} />
          <Route path="/signup" element={<Navigate replace to="/todo" />} />
          <Route path="/todo" element={<TodoList />} />
          </>
          :
          <>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/todo" element={<Navigate replace to="/signin" />}/>
          </>
          }
        </Routes>
      </div>
    </div>
  );
}

export default App;
