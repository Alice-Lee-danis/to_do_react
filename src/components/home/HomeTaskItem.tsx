import React, { Dispatch } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMenuItem, MenuAction, menuCreateItemActionCreators } from '../../state/reducers/menuReducer/MenuReducer';
import { ITask } from '../../state/reducers/toDoReducer/ToDoTypeReducer';
import classes from "../../styles/homeTaskItem.module.scss"

const HomeTaskItem:React.FC<ITask & {deleteTask:(id:number)=>void}> = ({id,name, progressBar, isActiveLenght, taskCountLenght, deleteTask}) => {

    const dispatch : Dispatch<MenuAction> = useDispatch()

    return (
        <div className={classes.taskItem}>
            <div>
                <h1>{name}</h1>
                <p>{progressBar! ? progressBar  +"%" : '0%'}</p>
                <Link className={classes.link} to={`/task/${id}`} onClick={()=>{
                    dispatch(menuCreateItemActionCreators(
                        {
                            link:`/task/${id}`
                        } as IMenuItem
                    ))

                }}>перейти</Link>
            </div>
            <div className={classes.endTaskContext}>
                <button className={classes.endTaskButton} onClick={()=>{
                    deleteTask(id)
                }}>закончить</button>
            </div>
        </div>  
    );
  }
  
  export default HomeTaskItem;
  