import { StyledComponentProps, Theme, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { Moment } from "moment";
import moment from "moment-timezone/moment-timezone";
import React from "react";
import { IDayEvent } from "../redux/actions/dayActions";
import EventEditorDialog from "./EventEditorDialog";

const styles = (theme: Theme) => ({
  appBar: {
    bottom: 0,
    top: "auto",
  },
  fabButton: {
    left: 0,
    margin: "0 auto",
    position: "absolute",
    right: 0,
    top: theme.spacing.unit * -1,
    zIndex: 1,
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export interface ICalendarBarProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;

  onNext(): void;
  onPrev(): void;
  onSave(data: IDayEvent): void;
}

const CalendarBar = ({ classes, selectedDay, onPrev, onNext, onSave }: ICalendarBarProps) => classes && (
  <AppBar position="relative" color="primary" className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <Button color="inherit" aria-label="previous month" onClick={onPrev}>
        {moment(selectedDay).subtract(1, "month").format("MMMM")}
      </Button>
      <EventEditorDialog selectedDay={selectedDay} fabButtonClassName={classes.fabButton} onSave={onSave} />
      <div>
        <Button color="inherit" aria-label="next month" onClick={onNext}>
          {moment(selectedDay).add(1, "month").format("MMMM")}
        </Button>
      </div>
    </Toolbar>
  </AppBar>
);

// @ts-ignore
export default withStyles(styles)(CalendarBar);
