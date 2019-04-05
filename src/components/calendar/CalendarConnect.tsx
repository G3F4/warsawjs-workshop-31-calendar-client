import { Moment } from "moment";
import moment from "moment-timezone/moment-timezone";
import { connect } from "react-redux";
import { dispatchFetchCalendar } from "../../redux/actions/calendarActions";
import { dispatchFetchDay } from "../../redux/actions/dayActions";
import Calendar from "./Calendar";

const mapStateToProps = (state: any) => {
  const { day, calendar } = state;

  return {
    ...calendar,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
