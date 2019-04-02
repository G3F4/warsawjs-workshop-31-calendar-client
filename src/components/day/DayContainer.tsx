// @ts-ignore
import { StyledComponentProps, Theme, withStyles } from "@material-ui/core/styles";
import { Moment } from "moment-timezone/moment-timezone";
import React, { Suspense } from "react";
import DayDataProvider from "./DayDataProvider";

const styles = () => ({
  root: {
    display: "flex",
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
      <Suspense fallback="Loading...">
        <DayDataProvider selectedDay={selectedDay} />
      </Suspense>
    </div>
  );
}

// @ts-ignore
export default withStyles(styles)(DayContainer);
