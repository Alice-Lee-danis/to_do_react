import { combineReducers } from "redux";
import { MenuReducer } from "./menuReducer/MenuReducer";
import { ToDoReducer } from "./toDoReducer/ToDoReducer";

export const combineReducer = combineReducers({
    ToDoReducer,
    MenuReducer
})

export type combineState = ReturnType<typeof combineReducer>