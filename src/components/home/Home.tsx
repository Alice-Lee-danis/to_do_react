import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useToDoSelector } from '../../state/Hooks/useToDoSelector';
import { ToDoActionCreators } from '../../state/reducers/action-creators/ToDoActionCreators';
import classes from "../../styles/home.module.scss"
import { IJSONTask } from '../../types/ITask';
import Modal from '../modal/Modal';
import HomeTaskItem from './HomeTaskItem';

function Home() {
    const dispatch = useDispatch()
    const {task} = useToDoSelector(state => state.ToDoReducer)
    const [viewModalState, viewModaSetlState] = useState<Boolean>(false)
    const [helloState, helloSetState] = useState<string>("")

    useEffect(()=>{
        dispatch(ToDoActionCreators())
        const helloLS = localStorage.getItem('name')
        if(helloLS){
            helloSetState(helloLS!)
        }
        else {
            localStorage.setItem("name", "")
        }
    }, [])

    useEffect(()=>{
        if(helloState?.length!==0){
            localStorage.setItem("name", helloState)
            const hellLS = localStorage.getItem('name')
            helloSetState(hellLS!)
        }
        
    }, [helloState])


    function contextExit(isExit:Boolean):void {
        viewModaSetlState(isExit)
    }

    const taskNameSet = (arg:string)=>{
        const Task:IJSONTask = {
            id:1,
            name:arg,
            notes:[] 
        }
        const task = localStorage.getItem("task")
        const tasksArr = (JSON.parse(task!) as Array<IJSONTask>)
        if(!tasksArr || tasksArr.length === 0){
            const tasks:Array<IJSONTask> = [Task]
            localStorage.setItem("task", JSON.stringify(tasks))
            dispatch(ToDoActionCreators())
        }
        else {
            try{
                const taskID = tasksArr[tasksArr.length-1].id
                Task.id = taskID +1
                const newTasks = [...tasksArr, Task]
                const JSONTasksArr = JSON.stringify(newTasks) 
                localStorage.setItem("task", JSONTasksArr)
                dispatch(ToDoActionCreators())
            }
            catch(e){
                console.log(e)
            }
        }
    }

    const deleteTask = (id:number)=>{
        const task = localStorage.getItem("task")
        try{
            const tasksArr = (JSON.parse(task!) as Array<IJSONTask>)
            const filterTasksArr = tasksArr.filter((item)=>item.id!==id)
            const JSONfilterTasksArr = JSON.stringify(filterTasksArr)
            localStorage.setItem("task", JSONfilterTasksArr)
            dispatch(ToDoActionCreators())
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <div className={classes.home}>        
            <h1 className={classes.titleText}>Привет {helloState}, сегодня большой день и пора приступать за дело. Удачи!</h1>
            <input className={classes.nameInput} type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                helloSetState(e.target.value)
            }}/>
            <div className={classes.taskList}>
                {
                    task?.map((item)=>{
                        return (
                            <HomeTaskItem key={item.id} id={item.id} name={item.name} progressBar={item.progressBar} isActiveLenght={item.isActiveLenght} 
                            taskCountLenght={item.taskCountLenght} deleteTask={deleteTask}></HomeTaskItem>
                        )
                    })
                }
            </div>
            <div className={classes.addTaskItemMenu}>
                    <button className={classes.menuItemLink}>
                        <a className={classes.link} href="https://daniskaramishev.ru/">резюме</a>
                    </button>
                    <button className={classes.addTaskItem}  onClick={()=>{
              viewModaSetlState(true)
            }}></button>
                    <button className={classes.menuItemLink}>
                        <a className={classes.link} href="https://t.me/daniskaramishev">telegram</a>
                    </button>
            </div>
            {viewModalState && <Modal contextExit={contextExit} taskNameSet={taskNameSet}></Modal>}
        </div>
    );
  }
  
  export default Home;
  