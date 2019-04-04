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

const fetchCalendar = (month: string) => (dispatch: any) => {
  dispatch(requestCalendar(month));
  return fetch(`/calendar?month=${month}`, { method: "GET", credentials: "same-origin" })
    .then((response) => response.json())
    .then(({ data }) => dispatch(receiveCalendar(month, data)));
};

export const dispatchFetchCalendar = (month: string) => (dispatch: any) => {
  return dispatch(fetchCalendar(month));
};
