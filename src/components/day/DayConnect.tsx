import { connect } from "react-redux";
import Day, { IDayProps } from "./Day";

const mapStateToProps = (state: any) => {
  const { day } = state;

  console.log(["mapStateToProps"], day);

  return day;
};

export default connect<{}, {}, IDayProps>(mapStateToProps)(Day);
