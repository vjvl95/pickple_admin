import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import "./Header.css";
import Report from '../report/report'
import styles from '../layout/style'


const ReviewHeader =(props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      <div className={classes.header}>
      
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                리뷰관리
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
      </div>
      
    </React.Fragment>
  );
}


ReviewHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewHeader);