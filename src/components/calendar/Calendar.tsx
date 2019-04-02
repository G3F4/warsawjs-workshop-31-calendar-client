import { Card } from "@material-ui/core";
// @ts-ignore
import { StyledComponentProps, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { Moment } from "moment-timezone/moment-timezone";
import moment from "moment-timezone/moment-timezone";
import React from "react";
import { IDay } from "./CalendarDataProvider";

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
  root: {
    display: "grid",
    gridTemplateColumns: "14.28% 14.28% 14.28% 14.28% 14.28% 14.28% 14.28%",
    gridTemplateRows: "16.66% 16.66% 16.66% 16.66% 16.66% 16.66%%",
  },
  selected: {
    background: "#eee",
  },
});

export interface ICalendarProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  list: IDay[];
  selectedDay: Moment;

  onChange(date: string): void;
}

const isDaySelected = (selectedDay: Moment, date: string) => selectedDay.isSame(moment(date), "day");

function Calendar(props: ICalendarProps) {
  const { classes, selectedDay, list, onChange } = props;

  if (!classes) {
    throw new Error(`error loading styles`);
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
          }, classes.day)}
          onClick={() => onChange(date)}
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

// @ts-ignore
export default withStyles(styles)(Calendar);
