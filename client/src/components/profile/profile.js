
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { USER_LOADING_REQUEST,TAG_DELETE_REQUEST } from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Profiletable from "./profiletable"
import { PROFILE_LOADING_REQUEST } from '../../actions/profileAction';
import Pagination from '../layout/Pagenation'
import Table from "../layout/table"

import "./profile.css"

const Profile = () => {
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);

    const dispatch = useDispatch();
    const {profiles,totalElements} = useSelector((state) => state.profile);
    useEffect(()=>{
      dispatch({
        type: PROFILE_LOADING_REQUEST,
        payload: {params:{direction:"ASC", page:currentPage, size:postsPerPage}},
        currentPage:currentPage
      })
      },[currentPage])
   
  return (
    <Paper className="profile-paper" style={{width:"45%", margin:"50px auto"}}>
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Table profiles={profiles} tablenum={3}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} />

    </Paper>
  );
}

export default Profile;