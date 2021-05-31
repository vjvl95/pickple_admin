import React from 'react';
import PropTypes from 'prop-types';
import {withStyles } from '@material-ui/core/styles';

import Header from '../header/MainHeader';
import Typography from '@material-ui/core/Typography';
import styles from "./style"
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {  useEffect,useState } from 'react'
import { REPORT_SEARCH_REQUEST } from '../../actions/reportAction';
import { APPLY_LOADING_REQUEST } from '../../actions/applyAction';

import {useDispatch, useSelector} from "react-redux"
import { Fragment } from 'react';
import Pagination from "./Pagenation"
import Table from "./table"

function Paperbase(props) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage ]=useState(10);
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
  return (
    <Fragment>
    <Header/>

    <Paper className="paper_tagadd"  style={{minWidth:"624px"}}>
    <AppBar className="searchBar" position="static" color="default" elevation={0}>
      <Toolbar>
      </Toolbar>
    </AppBar>
    <div className="contentWrapper">
      <Typography color="textSecondary" align="center">
     {reports.length===0 ?"처리 대기중인 신고가 없습니다":<Table reports={reports} tablenum={4}/>}
      </Typography>
    </div>
    {reports.length===0 ?null :<Pagination postsPerPage={postsPerPage} totalPosts = {totalElements_report} paginate={setCurrentPage} page={currentPage}/>}

  </Paper>

  <Paper className="paper_tagadd" style={{minWidth:"624px"}}>
    <AppBar className="searchBar" position="static" color="default" elevation={0}>
      <Toolbar>
      </Toolbar>
    </AppBar>
    <div className="contentWrapper">
      <Typography color="textSecondary" align="center">
     {applys.length===0 ?"처리 대기중인 리뷰가 없습니다":<Table applys={applys} tablenum={1}/>}
      </Typography>
    </div>
    {applys.length===0 ?null :<Pagination postsPerPage={postsPerPage} totalPosts = {totalElements_apply} paginate={setCurrentPage}  page={currentPage}/>}
    
  </Paper>



  </Fragment>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);