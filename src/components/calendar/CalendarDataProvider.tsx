import { StyledComponentProps, Theme, withStyles } from "@material-ui/core/styles";
// @ts-ignore
import useFetch from "fetch-suspense";
import { Moment } from "moment-timezone/moment-timezone";
import React from "react";
import Calendar from "./Calendar";

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

export interface ICalendarDataProviderProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;

  onChange(date: string): void;
}

function CalendarDataProvider(props: ICalendarDataProviderProps) {
  const { classes, selectedDay, onChange } = props;
  const { data }: { data: IDay[]; } = useFetch(`/calendar?month=${selectedDay.format("YYYY-MM")}`, { method: "GET" });

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <Calendar selectedDay={selectedDay} list={data} onChange={onChange} />
  );
}

// @ts-ignore
export default withStyles(styles)(CalendarDataProvider);
