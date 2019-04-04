import { Moment } from "moment";
import { connect } from "react-redux";
import { dispatchRefetchCalendar } from "../../redux/actions/calendarActions";
import {
  dispatchDeleteEvent,
  dispatchFetchDay,
  dispatchUpdateEvent,
  IDayEvent,
} from "../../redux/actions/dayActions";
import { IRootReducerState } from "../../redux/reducers/rootReducer";
import Day from "./Day";

const mapStateToProps = (state: IRootReducerState) => {
  const { day } = state;

  return day;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchFetchDay(selectedDay: Moment) {
      dispatch(dispatchFetchDay(selectedDay.format("YYYY-MM-DD")));
    },
    dispatchDeleteEvent(eventId: string) {
      return dispatch(dispatchDeleteEvent(eventId));
    },
    dispatchUpdateEvent(data: IDayEvent) {
      return dispatch(dispatchUpdateEvent(data));
    },
    dispatchRefetchCalendar() {
      dispatch(dispatchRefetchCalendar());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
