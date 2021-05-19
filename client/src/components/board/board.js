
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
import { TAG_LOADING_REQUEST,TAG_DELETE_REQUEST } from '../../actions/tagAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { BOARD_LOADING_REQUEST } from '../../actions/boardAction';
import {Link} from "react-router-dom"
import Boardtable from "./boardtable"
import Pagination from '../layout/Pagenation'

const Board = () => {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage]=useState(10);
  const {boards,totalElements} = useSelector((state) => state.board);

  console.log(totalElements)
  useEffect(()=>{
    dispatch({
      type: BOARD_LOADING_REQUEST,
      payload:{params:{direction:"ASC", page:currentPage, size:10}},
      currentPage:currentPage

    })
    },[currentPage])
   
  return (
    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
  
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
       <Boardtable boards={boards}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} />

    </Paper>
  );
}

export default Board;