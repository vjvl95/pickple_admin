
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
import Profiletable from "./profiletable"
import { PROFILE_LOADING_REQUEST } from '../../actions/profileAction';
import "./profile.css"

const Profile = () => {
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);

  const indexOfLastTag=currentPage*postsPerPage
  const indexOfFirstTag=indexOfLastTag-postsPerPage

    const dispatch = useDispatch();
    const {profiles} = useSelector((state) => state.profile);
    useEffect(()=>{
      dispatch({
        type: PROFILE_LOADING_REQUEST,
        payload: {params:{direction:"ASC", page:1, size:10}},
        currentPage:currentPage
      })
      },[currentPage])
  
      console.log(profiles)
 
  return (
    <Paper className="profile-paper" style={{width:"60%", margin:"50px auto"}}>
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Profiletable profiles={profiles}/>

        
      </div>
    </Paper>
  );
}

export default Profile;