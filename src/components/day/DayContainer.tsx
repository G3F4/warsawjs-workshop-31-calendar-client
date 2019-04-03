// @ts-ignore
import { StyledComponentProps, Theme, withStyles } from "@material-ui/core/styles";
import { Moment } from "moment-timezone/moment-timezone";
import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary"
import DayDataProvider from "./DayDataProvider";

const styles = () => ({
  root: {
    display: "flex",
    width: "100%",
  },
});

export interface ICalendarContainerProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;
}

function DayContainer(props: ICalendarContainerProps) {
  const { classes, selectedDay } = props;

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <div className={classes.root}>
      <ErrorBoundary>
        <Suspense fallback="Loading...">
          <DayDataProvider selectedDay={selectedDay} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

// @ts-ignore
export default withStyles(styles)(DayContainer);
