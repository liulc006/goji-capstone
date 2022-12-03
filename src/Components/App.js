import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Routes, Route, Navigate } from 'react-router-dom';


const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  return (
      <Routes>
        <Route path = '/' element = {auth.id? <Home />: <Navigate to = '/login'/> }></Route>
        <Route path="/login"  element = { auth.id ? <Navigate to = '/' /> : <Login /> }></Route>   
      </Routes>

  );
};

export default App;
