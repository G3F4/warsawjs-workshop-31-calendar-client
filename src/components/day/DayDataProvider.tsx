import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";
// @ts-ignore
import useFetch from "fetch-suspense";
import { Moment } from "moment-timezone/moment-timezone";
import React from "react";
import Day from "./Day";

const styles = () => ({
  error: {
    textAlign: "center",
  },
});

export interface ICalendarEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  notification: boolean;
}

export interface IDayProps {
  selectedDay: Moment;
}

export interface IDayDataProviderResponse {
  data: ICalendarEvent[];
}

export interface IDayProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;
}

function DayDataProvider({ classes, selectedDay }: IDayProps) {
  const response: IDayDataProviderResponse =
    useFetch(`/day?date=${selectedDay.format("YYYY-MM-DD")}`, { method: "GET" });

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
    <Day list={response.data} />
  );
}

// @ts-ignore
export default withStyles(styles)(DayDataProvider);
