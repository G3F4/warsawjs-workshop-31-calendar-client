import moment, { Moment } from "moment-timezone/moment-timezone";
import { connect } from "react-redux";
import { dispatchFetchCalendar } from "../../redux/actions/calendarActions";
import { dispatchFetchDay, dispatchAddEvent, IDayEvent } from "../../redux/actions/dayActions";
import { IRootReducerState } from "../../redux/reducers/rootReducer";
import App from "./App";

const mapStateToProps = (state: IRootReducerState) => {
  const { day, calendar } = state;

  return {
    month: moment(calendar.month),
    selectedDay: moment(day.date),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchFetchDay(selectedDay: Moment) {
      return dispatch(dispatchFetchDay(selectedDay.format("YYYY-MM-DD")));
    },
    dispatchFetchCalendar(selectedDay: Moment) {
      return dispatch(dispatchFetchCalendar(selectedDay.format("YYYY-MM")));
    },
    dispatchAddEvent(data: IDayEvent) {
      dispatch(dispatchAddEvent(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
