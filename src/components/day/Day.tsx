import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { StyledComponentProps, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Delete } from "@material-ui/icons";
import moment, { Moment } from "moment-timezone/moment-timezone";
import React, { Component, Fragment } from "react";
import { IDayEvent } from "../../redux/actions/dayActions";
import EventEditorDialog from "../EventEditorDialog";

const styles = (theme: Theme) => ({
  actions: {
    display: "flex",
  },
  deleteButtonWrapper: {
    margin: theme.spacing.unit * 2,
  },
  flexGrow: {
    flexGrow: 1,
  },
  loader: {
    height: theme.spacing.unit * 81,
    width: "100%",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
});

export interface IDayProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  isFetching?: boolean;
  selectedDay?: Moment;
  list?: IDayEvent[];
}

class Day extends Component<IDayProps> {
  public render(): React.ReactNode {
    const { classes, list = [] } = this.props;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    if (this.props.isFetching) {
      return (
        <div className={classes.loader}>
          Loading...
        </div>
      );
    }

    return (
      <List className={classes.root}>
        {list.map((event) => (
          <ListItem key={event.id}>
            <ListItemAvatar>
              <Avatar>
                <Typography variant="button">
                  {moment(event.time).format("H:mm")}
                </Typography>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              secondaryTypographyProps={{
                component: "div",
              }}
              primary={event.title}
              secondary={
                <Fragment>
                  <Typography component="div" color="textPrimary">
                    {event.description}
                  </Typography>
                  <div className={classes.actions}>
                    <div className={classes.flexGrow} />
                    <div className={classes.deleteButtonWrapper}>
                      <Fab aria-label="Delete" color="primary" onClick={async () => {
                        await fetch(`event?id=${event.id}`, { method: "DELETE", credentials: "same-origin" });
                      }}>
                        <Delete />
                      </Fab>
                    </div>
                    <EventEditorDialog event={event} />
                  </div>
                </Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(Day);
