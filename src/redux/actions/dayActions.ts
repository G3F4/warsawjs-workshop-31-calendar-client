export const REQUEST_DAY = "REQUEST_DAY";
export const RECEIVE_DAY = "RECEIVE_DAY";

export interface IDayEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  notification: boolean;
}

export interface IDay {
  date: string;
  events: IDayEvent[];
}

export interface IDayDataProviderResponse {
  data: IDayEvent[];
}

export const requestDay = (date: string) => ({
  date,
  type: REQUEST_DAY,
});

export const receiveDay = (date: string, data: IDayDataProviderResponse) => ({
  data,
  date,
  type: RECEIVE_DAY,
});
const fetchDay = (date: string) => (dispatch: any) => {
  dispatch(requestDay(date));
  return fetch(`/day?date=${date}`)
    .then((response) => response.json())
    .then(({ data }) => dispatch(receiveDay(date, data)));
};

export const dispatchFetchDay = (date: string) => (dispatch: any) => {
  return dispatch(fetchDay(date));
};
