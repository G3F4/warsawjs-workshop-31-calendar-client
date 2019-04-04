import moment from "moment-timezone/moment-timezone";
import { RECEIVE_CALENDAR, RECEIVE_CALENDAR_ERROR, REQUEST_CALENDAR } from "../actions/calendarActions";

export interface ICalendarReducerState {
  error: any;
  isFetching: boolean;
  list: any[];
  month: string;
}

export default function calendarReducer(
  state: ICalendarReducerState = {
    error: null,
    isFetching: false,
    list: [],
    month: moment(Date.now()).format("YYYY-MM"),
  },
  action: any,
) {
  switch (action.type) {
    case REQUEST_CALENDAR:
      return Object.assign({}, state, {
        isFetching: true,
        month: action.month,
      });
    case RECEIVE_CALENDAR:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.data,
      });
    case RECEIVE_CALENDAR_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}
