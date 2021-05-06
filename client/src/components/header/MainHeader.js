import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';

import Grid from '@material-ui/core/Grid';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import "./Header.css";
import styles from '../layout/style'

const lightColor = 'rgba(255, 255, 255, 0.7)';

function MainHeader(props) {
  const { classes, onDrawerToggle } = props;
  return (
    <React.Fragment>
      <div className={classes.header}>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
        </Toolbar>
      </AppBar>
      <AppBar component="div" className={classes.secondaryBar} color="primary" position="static" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                메인 
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      </div>
    </React.Fragment>
  );
}

MainHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainHeader);