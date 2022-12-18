import { Dispatch } from "redux"
import { IJSONTask } from "../../../types/ITask"
import { AtionType, ITask, ToDoStateType } from "../toDoReducer/ToDoTypeReducer"

export const ToDoActionCreators = ():any =>{
    return (dispatch:Dispatch<ToDoStateType>) =>{
        new Promise(res=>{
            dispatch({type: AtionType.LOADING, payload:true})
            try {
               const Tasks =  JSON.parse(localStorage.getItem("task") as string)

                const tasksFromLS = Tasks.map((item:IJSONTask)=>{

                    const isActiveLenght = item.notes.filter((item)=>{
                        if(!item.isActive){
                            return true
                        }
                        return false
                    }).length

                    let progressBar = NaN

                    if(isActiveLenght!==0 && item.notes.length!==0){
                        progressBar  = Math.round(  100 * (isActiveLenght / item.notes.length ))
                    }
                
                    return{
                        ...item, 
                        progressBar:progressBar,
                        isActiveLenght:isActiveLenght,
                        taskCountLenght:item.notes.length,
                    } as ITask
                }) 
                
                dispatch({type: AtionType.GET_STATE, payload:{task:[...tasksFromLS], isLoading: false}})
            }
            catch(e){
                console.log(e)
            }
            
        })
    }
}