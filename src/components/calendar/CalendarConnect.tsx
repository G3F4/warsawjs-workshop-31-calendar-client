import { connect } from "react-redux";
import Calendar, { ICalendarProps } from "./Calendar";

const mapStateToProps = (state: any) => {
  const { calendar } = state;

  return calendar;
};

export default connect<{}, {}, ICalendarProps>(mapStateToProps)(Calendar);
