import { AtionType, IToDoReducerState, ToDoStateType } from "./ToDoTypeReducer"

const InitialToDoState:IToDoReducerState = {
    isLoading: false,
    task:[]
}

export const ToDoReducer = ((state:IToDoReducerState = InitialToDoState, action:ToDoStateType) : IToDoReducerState=>{
    switch(action.type) {
        case AtionType.LOADING:
            return {isLoading: true,task:[]}
        case AtionType.GET_STATE:
            return {isLoading: false, task:action.payload.task}
        default:
            return state
    }
})