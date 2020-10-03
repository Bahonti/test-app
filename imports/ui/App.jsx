import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Router from './router'
import Header from './components/Header'

export const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Router />

      <ToastContainer /> 
    </BrowserRouter>
  )
};
