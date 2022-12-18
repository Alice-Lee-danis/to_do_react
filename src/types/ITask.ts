export interface ITasks {
    task:Array<IJSONTask>
}

export interface INotes{
    id:number,
    name:string,
    date?:Date,
    isActive:boolean
}

export interface IJSONTask {
    id:number,
    name:string,
    notes:Array<INotes>
}