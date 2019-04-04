import moment from "moment-timezone/moment-timezone";
import {
  RECEIVE_ADD_EVENT,
  RECEIVE_DAY, RECEIVE_DAY_ERROR,
  RECEIVE_DELETE_EVENT, RECEIVE_UPDATE_EVENT, REQUEST_ADD_EVENT,
  REQUEST_DAY,
  REQUEST_DELETE_EVENT, REQUEST_UPDATE_EVENT,
} from "../actions/dayActions";

export interface IDayReducerState {
  isFetching: boolean;
  error: any;
  list: any[];
  date: string;
}

export default function dayReducer(
  state: IDayReducerState = {
    date: moment(Date.now()).format("YYYY-MM-DD"),
    error: null,
    isFetching: false,
    list: [],
  },
  action: any,
) {
  switch (action.type) {
    case REQUEST_DAY:
      return Object.assign({}, state, {
        date: action.date,
        error: null,
        isFetching: true,
        list: [],
      });
    case RECEIVE_DAY:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.data,
      });
    case RECEIVE_DAY_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case RECEIVE_DELETE_EVENT:
      return Object.assign({}, state, {
        list: state.list.filter(({ id }) => id !== action.deletedEventId),
      });
    case RECEIVE_UPDATE_EVENT:
      return Object.assign({}, state, {
        list: [action.data, ...state.list.filter(({ id }) => id !== action.data.id)],
      });
    case RECEIVE_ADD_EVENT:
      return Object.assign({}, state, {
        list: [action.data, ...state.list],
      });
    case REQUEST_ADD_EVENT:
    case REQUEST_UPDATE_EVENT:
    case REQUEST_DELETE_EVENT:
    default:
      return state;
  }
}
