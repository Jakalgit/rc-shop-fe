import {combineReducers} from "redux";
import finderReducer from "@/store/slices/finderSlice";

export const rootReducer = combineReducers({
	finder: finderReducer,
})