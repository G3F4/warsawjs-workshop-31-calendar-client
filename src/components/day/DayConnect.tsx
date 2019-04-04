import { Moment } from "moment";
import { connect } from "react-redux";
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

  console.log(['mapStateToProps.day'], day)

  return day;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchFetchDay(selectedDay: Moment) {
      dispatch(dispatchFetchDay(selectedDay.format("YYYY-MM-DD")));
    },
    dispatchDeleteEvent(eventId: string) {
      dispatch(dispatchDeleteEvent(eventId));
    },
    dispatchUpdateEvent(data: IDayEvent) {
      dispatch(dispatchUpdateEvent(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
