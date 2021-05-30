import React , {useEffect}from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {useDispatch } from "react-redux";

import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import "./Header.css";
import styles from '../layout/style'
import {LOGOUT_REQUEST} from "../../actions/loginAction"





function Header(props) {

  useEffect(() => {

  }, []);
  const { classes } = props;
  const dispatch = useDispatch();
const token=localStorage.getItem("token")
const onLogout = () => {
  dispatch({
    type: LOGOUT_REQUEST,
  });
}

const authLink = (
  <Button color="inherit"  onClick={()=>onLogout()} >
  LOGOUT
  </Button>

);

const guestLink = (
  <Button color="inherit" >
  LOGIN
  </Button>
)
  return (




    <React.Fragment>
      <div className={classes.header}>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs />            
            <Grid item>
              {token ? authLink : guestLink}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
      
      </div>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);