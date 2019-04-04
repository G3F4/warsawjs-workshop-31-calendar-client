import { StyledComponentProps, Theme, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Moment } from "moment-timezone/moment-timezone";
import React, { Component } from "react";
import { IDayEvent } from "../../redux/actions/dayActions";
import CalendarConnect from "../calendar/CalendarConnect";
import CalendarBar from "../CalendarBar";
import DayConnect from "../day/DayConnect";

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

export interface IAppProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  month: Moment;
  selectedDay: Moment;

  dispatchFetchDay(date: Moment): void;
  dispatchFetchCalendar(date: Moment): void;
  dispatchAddEvent(data: IDayEvent): void;
}

class App extends Component<IAppProps> {
  public handleSave = async (event: IDayEvent) => {
    const { dispatchAddEvent, dispatchFetchCalendar, month } = this.props;

    await dispatchAddEvent(event);

    dispatchFetchCalendar(month);
  }

  public handlePrevMonth = async () => {
    const nextSelectedDay = this.props.selectedDay.subtract(1, "month");

    await this.props.dispatchFetchCalendar(nextSelectedDay);
    await this.props.dispatchFetchDay(nextSelectedDay);
  }

  public handleNextMonth = async () => {
    const nextSelectedDay = this.props.selectedDay.add(1, "month");

    await this.props.dispatchFetchCalendar(nextSelectedDay);
    await this.props.dispatchFetchDay(nextSelectedDay);
  }

  public render() {
    const { classes, month, selectedDay } = this.props;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h2" gutterBottom className={classes.header}>
            {month.format("MMMM YYYY")}
          </Typography>
          <CalendarConnect />
          <CalendarBar
            selectedDay={selectedDay}
            onNext={this.handleNextMonth}
            onPrev={this.handlePrevMonth}
            onSave={this.handleSave}
          />
          <DayConnect />
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(App);
