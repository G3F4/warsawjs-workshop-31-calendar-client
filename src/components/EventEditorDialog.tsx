import { StyledComponentProps, Theme, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { Add, Edit } from "@material-ui/icons";
import moment, { Moment } from "moment-timezone/moment-timezone";
import React, { ChangeEvent, Component } from "react";
import { IDayEvent } from "../redux/actions/dayActions";

const styles = (theme: Theme) => ({
  dialogContent: {
    minWidth: theme.spacing.unit * 10 * 5,
  },
  firstRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    margin: theme.spacing.unit * 2,
  },
});

export interface IEventEditorDialogProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  fullScreen?: boolean;
  event?: IDayEvent;
  selectedDay?: Moment;
  fabButtonClassName?: string;

  onSave(data: Partial<IDayEvent>): void;
}

interface IState {
  open: boolean;
  event: Partial<IDayEvent>;
}

class EventEditorDialog extends Component<IEventEditorDialogProps, IState> {
  public state = {
    event: this.props.event || {
      description: "",
      notification: false,
      time: moment(this.props.selectedDay).format("YYYY-MM-DDThh:mm"),
      title: "",
    },
    open: false,
  };

  public handleClickOpen = () => {
    this.setState({
      event: this.props.event || {
        description: "",
        notification: false,
        time: moment(this.props.selectedDay).format("YYYY-MM-DDThh:mm"),
        title: "",
      },
      open: true,
    });
  }

  public handleClose = () => {
    this.setState({
      event: {
        description: "",
        notification: false,
        time: moment(this.props.selectedDay).format("YYYY-MM-DDThh:mm"),
        title: "",
      },
      open: false,
    });
  }

  public handleEventTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      event: {
        ...this.state.event,
        time: moment(event.target.value).format("YYYY-MM-DDThh:mm"),
      },
    });
  }

  public handleEventTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      event: {
        ...this.state.event,
        title: event.target.value,
      },
    });
  }

  public handleEventDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      event: {
        ...this.state.event,
        description: event.target.value,
      },
    });
  }

  public handleEventNotificationChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      event: {
        ...this.state.event,
        notification: event.target.checked,
      },
    });
  }

  public handleSave = () => {
    this.props.onSave(this.state.event);
    this.handleClose();
  }

  public render() {
    const { classes, fullScreen, event, fabButtonClassName } = this.props;
    const { open, event: { description, time, title, notification } } = this.state;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    return (
      <div className={classes.root}>
        <Fab color="secondary" aria-label="Open editor" onClick={this.handleClickOpen} className={fabButtonClassName}>
          {event ? <Edit /> : <Add />}
        </Fab>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
        >
          <DialogContent className={classes.dialogContent}>
            <div className={classes.firstRow}>
              <TextField
                value={time}
                onChange={this.handleEventTimeChange}
                label="Time"
                type="datetime-local"
                placeholder="Enter event time"
                helperText="Event time"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    onChange={this.handleEventNotificationChange}
                    checked={notification}
                    value="notification"
                    color="primary"
                  />
                }
                label="Notification"
              />
            </div>
            <TextField
              value={title}
              onChange={this.handleEventTitleChange}
              label="Title"
              placeholder="Enter event title"
              helperText="Event title"
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              value={description}
              onChange={this.handleEventDescriptionChange}
              label="Description"
              placeholder="Enter event description"
              helperText="Event description"
              margin="normal"
              variant="outlined"
              rows="4"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(withMobileDialog<IEventEditorDialogProps>({ breakpoint: "xs" })(EventEditorDialog));
