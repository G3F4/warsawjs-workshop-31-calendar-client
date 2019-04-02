import { Card } from "@material-ui/core";
// @ts-ignore
import { StyledComponentProps, Theme, withStyles } from "@material-ui/core/styles";
import { Moment } from "moment-timezone/moment-timezone";
import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary"
import CalendarDataProvider from "./CalendarDataProvider";

const styles = (theme: Theme) => ({
  root: {
    height: theme.spacing.unit * 81,
  },
  paper: {
    alignItems: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing.unit * 2,
    textAlign: "center",
  },
});

export interface ICalendarContainerProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;

  onChange(date: string): void;
}

function CalendarContainer(props: ICalendarContainerProps) {
  const { classes, selectedDay, onChange } = props;

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <Suspense fallback={<div className={classes.root}>Loading...</div>}>
      <ErrorBoundary>
        <Card className={classes.root}>
            <CalendarDataProvider onChange={onChange} selectedDay={selectedDay} />
        </Card>
      </ErrorBoundary>
    </Suspense>
  );
}

// @ts-ignore
export default withStyles(styles)(CalendarContainer);
