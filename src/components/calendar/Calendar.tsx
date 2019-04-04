import { Card } from "@material-ui/core";
// @ts-ignore
import { StyledComponentProps, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { Moment } from "moment-timezone/moment-timezone";
import moment from "moment-timezone/moment-timezone";
import React, { Component } from "react";
import { IDay } from "../../redux/actions/dayActions";

export const DAYS = ["Mon", "Thu", "Wed", "Thr", "Fri", "Sat", "Sun"];

const styles = (theme: Theme) => ({
  day: {
    "&:hover": {
      background: "#eee",
    },
    "border": "solid 1px #eee",
    "color": theme.palette.text.secondary,
  },
  eventTitle: {
    whiteSpace: "nowrap",
  },
  loader: {
    height: theme.spacing.unit * 81,
    width: "100%",
  },
  outOfMonth: {
    background: "#ededed",
  },
  root: {
    display: "grid",
    gridTemplateColumns: "14.28% 14.28% 14.28% 14.28% 14.28% 14.28% 14.28%",
    gridTemplateRows: "16.66% 16.66% 16.66% 16.66% 16.66% 16.66%%",
    width: "100%",
  },
  selected: {
    background: "#eee",
  },
});

export interface ICalendarProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  error: any;
  isFetching: boolean;
  list: IDay[];
  selectedDay: Moment;
  month: Moment;

  dispatchFetchDay(date: Moment): void;
  dispatchFetchCalendar(date: Moment): void;
}

const isDaySelected = (selectedDay: Moment, date: string) => selectedDay.isSame(moment(date), "day");
const isDayOutOfMonth = (selectedDay: Moment, date: string) => !selectedDay.isSame(moment(date), "month");

class Calendar extends Component<ICalendarProps> {
  public componentDidMount(): void {
    this.props.dispatchFetchCalendar(moment(Date.now()));
  }

  public handleSelectedDayChange(date: string): void {
    this.props.dispatchFetchDay(moment(date));

    if (!moment(date).isSame(this.props.month, "month")) {
      this.props.dispatchFetchCalendar(moment(date));
    }
  }

  public render(): React.ReactNode {
    const { classes, error, isFetching, selectedDay = moment(Date.now()), list = [], month } = this.props;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    if (isFetching) {
      return (
        <div className={classes.loader}>
          Loading...
        </div>
      );
    }

    if (error) {
      return (
        <div className={classes.loader}>
          {error}
        </div>
      );
    }

    return (
      <div className={classes.root}>
        {DAYS.map((day) => (
          <Card key={day}>
            <Typography variant="h6" gutterBottom>
              {day}
            </Typography>
          </Card>
        ))}
        {list.map(({ date, events }) => (
          <Card
            key={date}
            className={classnames({
              [(classes.selected as string)]: isDaySelected(selectedDay, date),
              [(classes.outOfMonth as string)]: isDayOutOfMonth(moment(month), date),
            }, classes.day)}
            onClick={() => this.handleSelectedDayChange(date)}
          >
            <Typography variant="h6" gutterBottom>
              {moment(date).format("DD")}
            </Typography>
            <div>
              {Array.from({ length: 3 }).map((_, index) => (
                <Typography
                  variant="caption"
                  key={events[index] ? events[index].id : index}
                  className={classes.eventTitle}
                  gutterBottom
                >
                  {events[index] ? events[index].title : <div>&nbsp;</div>}
                </Typography>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(Calendar);
