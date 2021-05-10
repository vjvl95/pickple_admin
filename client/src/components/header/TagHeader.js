import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Tag from '../tag/tag'
import Tagadd from '../tag/tagadd'
import styles from '../layout/style'
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { TAG_LOADING_REQUEST,TAG_DELETE_REQUEST } from '../../actions/tagAction';
import {Link} from "react-router-dom"

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
                태그 관리 
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
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Tagheader);