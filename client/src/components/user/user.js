
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { USER_LOADING_REQUEST,TAG_DELETE_REQUEST } from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Usertable from "./usertable"
import UserSearch from "./userSearch"
import { Fragment } from 'react';
import Pagination from '../layout/Pagenation'

const User = () => {

  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);
  const dispatch = useDispatch();
  const {users,totalElements} = useSelector((state) => state.user);
  useEffect(()=>{
    dispatch({
      type: USER_LOADING_REQUEST,
      payload:{params:{direction:"ASC", page:currentPage, size:postsPerPage}}
    })
    },[currentPage])

    console.log(users)
    console.log(totalElements)

  const indexOfLastTag=currentPage*postsPerPage
  const indexOfFirstTag=indexOfLastTag-postsPerPage
  const currentTags=users.slice(indexOfFirstTag,indexOfLastTag)

   
  return (
    <Fragment>
    <UserSearch/>
    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
        
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Usertable users={users}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} />

    </Paper>
    </Fragment>
  );
}


export default (User);