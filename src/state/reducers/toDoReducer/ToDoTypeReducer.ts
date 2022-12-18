export interface INotes{
    id:number,
    name:string,
    date?:Date,
    isActive:boolean
}

export interface ITask {
    id:number,
    name:string,
    progressBar:number,
    isActiveLenght:number,
    taskCountLenght:number,
    notes?:Array<INotes>
}

export interface IToDoReducerState {
    isLoading:Boolean,
    task?: Array<ITask>
}

export enum AtionType {
    LOADING = "LOADING",
    GET_STATE = "GET_STATE"
}

interface LoadingToToAction{
    type: AtionType.LOADING,
    payload: Boolean
}

interface GetStateToToAction {
    type: AtionType.GET_STATE,
    payload: IToDoReducerState
}

export type ToDoStateType = LoadingToToAction | GetStateToToAction
