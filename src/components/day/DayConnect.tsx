import { Moment } from "moment";
import { connect } from "react-redux";
import { dispatchFetchDay } from "../../redux/actions/dayActions";
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
      return dispatch(dispatchFetchDay(selectedDay.format("YYYY-MM-DD")));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
