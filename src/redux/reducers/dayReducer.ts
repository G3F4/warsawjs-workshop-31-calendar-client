import moment from "moment-timezone/moment-timezone";
import { RECEIVE_DAY, REQUEST_DAY } from "../actions/dayActions";

export default function dayReducer(
  state = {
    date: moment(Date.now()).format("YYYY-MM-DD"),
    isFetching: false,
    list: [],
  },
  action: any,
) {
  switch (action.type) {
    case REQUEST_DAY:
      return Object.assign({}, state, {
        date: action.date,
        isFetching: true,
        list: [],
      });
    case RECEIVE_DAY:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.data,
      });
    default:
      return state;
  }
}
