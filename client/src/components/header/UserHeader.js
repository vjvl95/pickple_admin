import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import User from '../user/user'
import styles from '../layout/style'
const lightColor = 'rgba(255, 255, 255, 0.7)';

const Tagheader =(props) => {

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
                사용자 관리 
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
      </div>
      
    </React.Fragment>
  );
}


Tagheader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tagheader);