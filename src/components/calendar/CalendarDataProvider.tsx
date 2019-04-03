import { Card, Typography } from "@material-ui/core"
import { StyledComponentProps, Theme, withStyles } from "@material-ui/core/styles";
// @ts-ignore
import useFetch from "fetch-suspense";
import { Moment } from "moment-timezone/moment-timezone";
import React from "react";
import Calendar from "./Calendar";

const styles = (theme: Theme) => ({
  day: {
    "&:hover": {
      background: "#eee",
    },
    "border": "solid 1px #eee",
    "color": theme.palette.text.secondary,
  },
  error: {
    textAlign: "center",
  },
  eventTitle: {
    whiteSpace: "nowrap",
  },
  root: {
    height: theme.spacing.unit * 81,
    width: "100%",
  },
  selected: {
    background: "#eee",
  },
});

export interface ICalendarEvent {
  id: string;
  title: string;
  description: string;
  time: Moment;
}

export interface IDay {
  date: string;
  events: ICalendarEvent[];
}

export interface ICalendarDataProviderResponse {
  data: IDay[];
}

export interface ICalendarDataProviderProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;

  onChange(date: string): void;
}

function CalendarDataProvider(props: ICalendarDataProviderProps) {
  const { classes, selectedDay, onChange } = props;
  const response: ICalendarDataProviderResponse =
    useFetch(`/calendar?month=${selectedDay.format("YYYY-MM")}`, { method: "GET" });

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  if (!response.data) {
    return (
      <div className={classes.error}>
        <Typography component="h2" variant="h4" gutterBottom>
          ERROR!
        </Typography>
        <Typography variant="button" gutterBottom>
          {response}
        </Typography>
      </div>
    );
  }

  return (
    <Card className={classes.root}>
      <Calendar selectedDay={selectedDay} list={response.data} onChange={onChange} />
    </Card>
  );
}

// @ts-ignore
export default withStyles(styles)(CalendarDataProvider);
