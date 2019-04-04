import { StyledComponentProps, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";

const styles = {
  header: {
    textAlign: "center",
  },
  icon: {
    height: "70%",
    marginLeft: "15%",
    width: "70%",
  },
};

export interface IErrorBoundaryProps extends StyledComponentProps<keyof typeof styles> {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
  error: Error;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IState> {
  public state = { hasError: false, error: new Error() };

  public componentDidCatch(error: Error) {
    this.setState({ hasError: true, error });
  }

  public render(): React.ReactNode {
    const { classes } = this.props;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    if (this.state.hasError) {
      return (
        <Fragment>
          <Typography component="h5" variant="h5" gutterBottom className={classes.header}>
            ERROR!
          </Typography>
          <div>
            <div>{this.state.error.name}</div>
            <div>{this.state.error.message}</div>
            <div>{this.state.error.stack}</div>
          </div>
        </Fragment>
      );
    }

    return this.props.children;
  }
}

// @ts-ignore
export default withStyles(styles)(ErrorBoundary);
