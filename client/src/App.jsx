import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/home';
import Detail from './views/detail';
import Add from './views/add';
import Login from './views/login';
import Register from './views/register';
import React, { useState } from 'react';
import UserContext from './utils/userContext';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  console.log(loggedInUser); 

  return (
    <>
      <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
        <BrowserRouter>
              <Routes>
                  <Route element={<Login/>} path="/" default/>
                  <Route element={<Register/>} path="/register" /> 
                  <Route element={<ProtectedRoutes/>}>
                    <Route element={<Main/>} path="/dashboard" />   
                    <Route element={<Detail/>} path="/image/:id"/>
                    <Route element={<Add/>} path="/new"/>
                  </Route>
              </Routes>
          </BrowserRouter>
        </UserContext.Provider>
    </>
  );
}

export default App;
