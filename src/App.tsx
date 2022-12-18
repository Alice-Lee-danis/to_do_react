import React, { useEffect } from 'react';
import classes from "./styles/app.module.scss"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Index from './router/Index';

const App:React.FC = () => {

  return (
    <BrowserRouter>
     <Index></Index>
    </BrowserRouter>
  );
}

export default App;
