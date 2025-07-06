import {IFinderState} from "@/store/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IFinderState = {
	isOpen: false,
}

const finderSlice = createSlice({
	name: "finder",
	initialState,
	reducers: {
		setIsOpenFinder: (state, action: PayloadAction<typeof initialState.isOpen>) => {
			state.isOpen = action.payload;
		}
	}
});

export const finderSliceActions = finderSlice.actions;
export default finderSlice.reducer;