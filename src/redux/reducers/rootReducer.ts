import { combineReducers } from "redux";
import calendarReducer, { ICalendarReducerState } from "./calendarReducer";
import dayReducer, { IDayReducerState } from "./dayReducer";

export interface IRootReducerState {
  calendar: ICalendarReducerState;
  day: IDayReducerState;
}

const rootReducer = combineReducers<IRootReducerState>({
  calendar: calendarReducer,
  day: dayReducer,
});

export default rootReducer;
