import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from '../layout/style'
import { withStyles } from '@material-ui/core/styles';


const UserHeader =(props) => {

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


UserHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserHeader);