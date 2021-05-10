import './tag.css';
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
import { TAG_UPLOADING_REQUEST,TAG_LOADING_REQUEST,TAG_DELETE_REQUEST } from '../../actions/tagAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { hot } from 'react-hot-loader'
import TextField from '@material-ui/core/TextField';
import Pagination from '../layout/Pagenation'

const Tagadd = () => {

    const [contents,setContents]=useState("")
    const dispatch = useDispatch();

    const onuploadClick = (contents) => {
      try{
        var answer = window.confirm(contents+"을 추가하시겠습니까?");

      if (answer) {
        dispatch({
          type:TAG_UPLOADING_REQUEST,
          payload:{tagName:contents},
        },[])
        }  
      }
    catch(e){
        console.log(e)
    }
  }

  return (
    <Paper className="paper_tagadd">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Typography color="textSecondary" align="center">
        <TextField id="standard-basic" label="태그등록" onChange={(e) => {setContents(e.target.value)}} value={contents} />
        <Button className="tag_add_button" variant="contained" color="primary" onClick={()=>onuploadClick(contents)}>
        등록
        </Button>
        </Typography>
      </div>
    </Paper>
  );
}

export default (Tagadd);