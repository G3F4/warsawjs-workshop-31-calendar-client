import ENV from "../../env";
import { IRootReducerState } from "../reducers/rootReducer";
import { IDay } from "./dayActions";

export const REQUEST_CALENDAR = "REQUEST_CALENDAR";
export const RECEIVE_CALENDAR = "RECEIVE_CALENDAR";
export const RECEIVE_CALENDAR_ERROR = "RECEIVE_CALENDAR_ERROR";

// @ts-ignore
const URL = ENV.API_URL;

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

export const receiveCalendarError = (error: any) => ({
  error,
  type: RECEIVE_CALENDAR_ERROR,
});

const fetchCalendar = (month: string) => async (dispatch: any) => {
  dispatch(requestCalendar(month));

  try {
    // @ts-ignore
    const response = await fetch(`${URL}/calendar?month=${month}`, { method: "GET", credentials: "same-origin" });

    if (response.status >= 200 && response.status <= 300) {
      const { data } = await response.json();

      return dispatch(receiveCalendar(month, data));
    }
    const text = await response.text();

    return dispatch(receiveCalendarError(text));
  } catch (e) {
    return dispatch(receiveCalendarError(e.message));
  }
};

export const dispatchFetchCalendar = (month: string) => (dispatch: any) => dispatch(fetchCalendar(month));

export const dispatchRefetchCalendar = () => (dispatch: any, getState: () => IRootReducerState) => {
  const { calendar: { month } } = getState();

  return dispatch(fetchCalendar(month));
};
