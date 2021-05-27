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
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import {  useEffect,useState } from 'react'
import Button from '@material-ui/core/Button';
import { REPORT_SEARCH_REQUEST } from '../../actions/reportAction';
import { APPLY_LOADING_REQUEST } from '../../actions/applyAction';

import {useDispatch, useSelector} from "react-redux"
import { Fragment } from 'react';
import Reporttable from "../report/reporttable"
import Applytable from "../apply/applytable"
import Pagination from "./Pagenation"

function Paperbase(props) {
  const [contents,setContents]=useState("")
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);
  const {reports,totalElements_report} = useSelector((state) => state.report);
  const { applys, totalElements_apply } = useSelector((state) => state.apply);

   console.log(reports)
  useEffect(()=>{
    dispatch({
      type: REPORT_SEARCH_REQUEST,
      payload:{pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage},  reportState: "BEFORE" },
    })
    dispatch({
      type: APPLY_LOADING_REQUEST,
      payload:{pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}, reviewState:"WAITING"},
    })
  
    },[currentPage],
    
    

    )
   

      console.log(applys)
      console.log(reports)
  return (
    <Fragment>
    <Header/>

    <Paper className="paper_tagadd">
    <AppBar className="searchBar" position="static" color="default" elevation={0}>
      <Toolbar>
      </Toolbar>
    </AppBar>
    <div className="contentWrapper">
      <Typography color="textSecondary" align="center">
     {reports.length===0 ?"처리 대기중인 신고가 없습니다":<Reporttable reports={reports}/>}
      </Typography>
    </div>
    {reports.length===0 ?null :<Pagination postsPerPage={postsPerPage} totalPosts = {totalElements_report} paginate={setCurrentPage} />}

  </Paper>

  <Paper className="paper_tagadd">
    <AppBar className="searchBar" position="static" color="default" elevation={0}>
      <Toolbar>
      </Toolbar>
    </AppBar>
    <div className="contentWrapper">
      <Typography color="textSecondary" align="center">
     {applys.length===0 ?<h1>처리 대기중인 리뷰가 없습니다</h1>:<Applytable applys={applys}/>}
      </Typography>
    </div>
    {applys.length===0 ?null :<Pagination postsPerPage={postsPerPage} totalPosts = {totalElements_apply} paginate={setCurrentPage} />}
    
  </Paper>



  </Fragment>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);