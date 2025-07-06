import {AppDispatch} from "@/store/index";
import {bindActionCreators} from "redux";
import {finderSliceActions} from "@/store/slices/finderSlice";

const allActions = {
	...finderSliceActions,
}

export const createActions = (dispatch: AppDispatch) => {
	return bindActionCreators(allActions, dispatch);
}