import React from 'react'
import { INotes } from '../../state/reducers/toDoReducer/ToDoTypeReducer';
import classes from "../../styles/cardItem.module.scss"

const CardItem:React.FC<INotes & {active: (arg:boolean, id:Number) => void}> = ({id, name, date, isActive, active})=> {

    //activeSetState(true)
   // activeSetState(false)
    return (
        <div className={classes.cardItem}>
            <div className={classes.infoCard}>
               <div className={classes.title}>
                    <h1>{name}</h1>
                    <p className={classes.isActive}>{isActive ? 'Active' : 'noActive'}</p>
                </div>
            </div>
            <button className={classes.activeTaskButton} onClick={()=>{
                active(!isActive, id)
            }}><h1>{isActive ? 'закончить' : 'начать'}</h1></button>
        </div>
       
    );
  }
  
  export default CardItem;
  