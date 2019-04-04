import { Moment } from "moment-timezone/moment-timezone";
import { connect } from "react-redux";
import App from "./App";
import { dispatchFetchCalendar } from "./redux/actions/calendarActions";
import { dispatchFetchDay } from "./redux/actions/dayActions";

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchFetchDay(selectedDay: Moment) {
      return dispatch(dispatchFetchDay(selectedDay.format("YYYY-MM-DD")));
    },
    dispatchFetchCalendar(selectedDay: Moment) {
      return dispatch(dispatchFetchCalendar(selectedDay.format("YYYY-MM-DD")));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
