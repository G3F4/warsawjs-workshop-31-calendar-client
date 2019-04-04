import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer";
import dayReducer from "./dayReducer";

const rootReducer = combineReducers({
  calendar: calendarReducer,
  day: dayReducer,
});

export default rootReducer;
