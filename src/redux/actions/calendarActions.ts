import { IRootReducerState } from "../reducers/rootReducer";
import { IDay } from "./dayActions";

export const REQUEST_CALENDAR = "REQUEST_CALENDAR";
export const RECEIVE_CALENDAR = "RECEIVE_CALENDAR";

export interface ICalendarDataProviderResponse {
  data: IDay[];
}

export const requestCalendar = (month: string) => ({
  month,
  type: REQUEST_CALENDAR,
});

export const receiveCalendar = (month: string, data: ICalendarDataProviderResponse) => ({
  data,
  month,
  type: RECEIVE_CALENDAR,
});

const fetchCalendar = (month: string) => async (dispatch: any) => {
  dispatch(requestCalendar(month));

  const response = await fetch(`/calendar?month=${month}`, { method: "GET", credentials: "same-origin" });
  const { data } = await response.json();

  return dispatch(receiveCalendar(month, data));
};

export const dispatchFetchCalendar = (month: string) => (dispatch: any) => dispatch(fetchCalendar(month));

export const dispatchRefetchCalendar = () => (dispatch: any, getState: () => IRootReducerState) => {
  const { calendar: { month } } = getState();

  return dispatch(fetchCalendar(month));
};
