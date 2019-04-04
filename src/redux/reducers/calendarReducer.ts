import moment from "moment-timezone/moment-timezone";
import { RECEIVE_CALENDAR, REQUEST_CALENDAR } from "../actions/calendarActions";

export default function calendarReducer(
  state = {
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
    default:
      return state;
  }
}
