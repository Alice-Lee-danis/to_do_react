import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import Menu from '../components/menu/Menu';
import TaskItem from '../components/Task/TaskItem';
import classes from "../styles/app.module.scss"

const Index:React.FC = () => {

                
  return (
    <>
     <Menu></Menu>
     <div className={classes.content}>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/task/:id' element={<TaskItem></TaskItem>}/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </div>
    </>
  );
}

export default Index;
