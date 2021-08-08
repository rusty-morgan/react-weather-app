import React from "react";
import { AppBar, Toolbar, MenuItem } from "@material-ui/core";

export default function TopBar({ classes, Link }) {
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <MenuItem component={Link} to="/">
          Current weather
        </MenuItem>
        <MenuItem component={Link} to="/hourly">
          Next 48 hours
        </MenuItem>
        <MenuItem component={Link} to="/daily">
          Next 7 days
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}
