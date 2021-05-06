import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';
import Content from './Content';
import Header from '../header/MainHeader';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import theme from "./theme"
import styles from "./style"

function Paperbase(props) {
 
  return (
    <ThemeProvider >
      <div >
        <CssBaseline />
        <div >
          <Header/>
        </div>
      </div>
    </ThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);