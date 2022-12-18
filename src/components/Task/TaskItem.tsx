import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useToDoSelector } from '../../state/Hooks/useToDoSelector';
import { ToDoActionCreators } from '../../state/reducers/action-creators/ToDoActionCreators';
import { ITask } from '../../state/reducers/toDoReducer/ToDoTypeReducer';
import classes from "../../styles/taskItem.module.scss"
import { IJSONTask, INotes } from '../../types/ITask';
import Modal from '../modal/Modal';
import CardItem from './cardItem';

function TaskItem() {
  type TaskParams = 'id' 
  const dispatch = useDispatch()
  const {task} = useToDoSelector(state=>state.ToDoReducer)
  const idTask = useParams<TaskParams>();
  const [viewModalState, viewModaSetlState] = useState<Boolean>(false)

  useEffect(()=>{
    dispatch(ToDoActionCreators())
  },[])

  function contextExit(isExit:Boolean):void {
    viewModaSetlState(isExit)
  }

  const getTask = () :ITask | undefined =>{
    return task?.find(item=>item.id === Number(idTask.id))
  }
  const taskReducer = getTask();
  const tasks = localStorage.getItem("task")
  const tasksArr = (JSON.parse(tasks!) as Array<IJSONTask>)

  const taskNameSet = (arg:string):void=>{
    try{
      if(taskReducer!.notes!.length === 0){
        taskReducer!.notes!.push({
          id: 1,
          name:arg, 
          date: new Date(),
          isActive: true
        })
        console.log(taskReducer!.notes!)

        tasksArr.map((item)=>{
          if(item.id=== Number(idTask.id)){
              item.notes = taskReducer!.notes as Array<INotes>
          }
        })
        localStorage.setItem("task", JSON.stringify(tasksArr))
      }
      else {
        const oldId =  taskReducer?.notes![taskReducer!.notes!.length-1].id
        taskReducer!.notes!.push({
          id: oldId! + 1,
          name:arg, 
          date: new Date(),
          isActive: true
        })

        tasksArr.map((item)=>{
          if(item.id=== Number(idTask.id)){
              item.notes = taskReducer!.notes as Array<INotes>
          }
        })

        localStorage.setItem("task", JSON.stringify(tasksArr))
      }
    }
    catch(e){
      console.log(e)
    }
    dispatch(ToDoActionCreators())
  }

  const active = (arg:Boolean, id:Number)=> {
    
    const newTask = tasksArr.map((item)=>{
      if(item.id === Number(idTask.id)){
        const a = item.notes.map((itemN)=>{
          if(itemN.id === id){
              return {
                ...itemN, isActive:arg
              }
            }
            return itemN
        })
        return {
          ...item, notes:a
        }
      }
      return item
    })
    localStorage.setItem("task", JSON.stringify(newTask))
    
    dispatch(ToDoActionCreators())
  }

  return (
      <div className={classes.taskItem}>
        <h1 className={classes.taskName}>{getTask()?.name}</h1>
        <div className={classes.taskInfoCard}>
            <h1>Выполненные задачи</h1>
            <p>{getTask()?.isActiveLenght + " из " + getTask()?.taskCountLenght}</p>
            <div className={classes.progressInfo}>
                <div className={classes.progressBar}>
                    <div className={classes.progressLine} style={{width: getTask()?.progressBar! ?  getTask()!.progressBar  +"%" : '0%'}}></div>
                </div>
                <h3>{getTask()?.progressBar! ?  getTask()!.progressBar  +"%" : '0%'}</h3>
            </div>
        </div>
        <div className={classes.cardList}>
          <div className={classes.addNoteSection}>
            <button className={classes.addNote} onClick={()=>{
              viewModaSetlState(true)
            }}>+Add new note</button>
          </div>
          {getTask()?.notes?.map((item)=>{
            return (
              <CardItem key={item.id} id={item.id} name={item.name} date={item.date} isActive={item.isActive} active = {active}></CardItem>
            )
          }).reverse()}
          
        </div>
        {viewModalState && <Modal contextExit={contextExit} taskNameSet={taskNameSet}></Modal>}
      </div>
    );
  }
  
export default TaskItem;
  