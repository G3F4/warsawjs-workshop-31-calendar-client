import { StyledComponentProps, Theme, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Moment } from "moment-timezone/moment-timezone";
import moment from "moment-timezone/moment-timezone";
import React, { Component } from "react";
import CalendarContainer from "./components/calendar/CalendarContainer";
import CalendarBar from "./components/CalendarBar";
import DayContainer from "./components/day/DayContainer";

const styles = (theme: Theme) => ({
  appBar: {
    bottom: 0,
    top: "auto",
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  fabButton: {
    left: 0,
    margin: "0 auto",
    position: "absolute",
    right: 0,
    top: -30,
    zIndex: 1,
  },
  header: {

  },
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    margin: "0 auto",
    maxWidth: theme.spacing.unit * 10 * 10,
    position: "relative",
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export interface IAppProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {}

interface IState {
  selectedDay: Moment;
}

class App extends Component<IAppProps, IState> {
  public state: IState = {
    selectedDay: moment(Date.now()),
  };

  public handleChangeSelectedDay = (date: string) => {
    this.setState({ selectedDay: moment(date) });
  }

  public handlePrevMonth = () => {
    this.setState({
      selectedDay: this.state.selectedDay.subtract(1, "month"),
    });
  }

  public handleNextMonth = () => {
    this.setState({
      selectedDay: this.state.selectedDay.add(1, "month"),
    });
  }

  public render() {
    const { classes } = this.props;
    const { selectedDay } = this.state;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h2" gutterBottom className={classes.header}>
            {moment(selectedDay).format("MMMM")}
          </Typography>
          <CalendarContainer selectedDay={selectedDay} onChange={this.handleChangeSelectedDay} />
          <CalendarBar selectedDay={selectedDay} onNext={this.handleNextMonth} onPrev={this.handlePrevMonth} />
          <DayContainer selectedDay={selectedDay} />
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(App);
