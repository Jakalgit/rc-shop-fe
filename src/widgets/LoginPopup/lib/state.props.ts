import {LoginPopupState} from "./states.enum";

export interface StateWidgetProps {
	setIsPopupOpen: (value: boolean) => void;
	setViewState: (value: LoginPopupState) => void;
}