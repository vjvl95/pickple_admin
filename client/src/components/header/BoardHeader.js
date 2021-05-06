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
import Board from '../board/board'
import styles from '../layout/style'

const BoardHeader =(props) => {
  const { classes, onDrawerToggle } = props;
  const [selectedTab,setSelectedTab]=React.useState(0);
 
  const handleChange=(event,newValue) => {
    setSelectedTab(newValue);
  }
 
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
                모집글 관리 
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
      </div>
      
    </React.Fragment>
  );
}

function TabPanel(props)
{
  const {children, value,index}=props;
  return (
    <div>
     {
       value==index&&(
         <h1>{children}</h1>
       )
     }
    </div>
  )
}

BoardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(BoardHeader);