import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { combineState } from "../reducers";

export const useToDoSelector:TypedUseSelectorHook<combineState> = useSelector