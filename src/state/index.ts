import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducer } from "./reducers";

export const Store = createStore(combineReducer, applyMiddleware(thunk))