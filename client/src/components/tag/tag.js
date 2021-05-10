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
import { TAG_LOADING_REQUEST,TAG_DELETE_REQUEST } from '../../actions/tagAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { hot } from 'react-hot-loader'
import Pagination from '../layout/Pagenation'
import Tagadd from "./tagadd"
import { Fragment } from 'react';
import { StylesProvider} from '@material-ui/styles';
import Tagsearch from "./tagsearch"
import Tagtable from "./tagtable"
const Tag = () => {
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);

  const {tags,totalElements} = useSelector((state) => state.tag);

  
  const indexOfLastTag=currentPage*postsPerPage
  const indexOfFirstTag=indexOfLastTag-postsPerPage
  const currentTags=tags.slice(indexOfFirstTag,indexOfLastTag)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const dispatch = useDispatch();

  console.log(currentPage)

  
  useEffect(()=>{
    dispatch({
      type: TAG_LOADING_REQUEST,
      payload:{params:{direction:"ASC", page:currentPage, size:postsPerPage}},
      currentPage:currentPage
    })
    },[currentPage])

   
    console.log(tags)
    console.log(currentTags)
    
  return (
    <Fragment>
    <Tagadd/>
    <Tagsearch/>

    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar style={{color:"#007bff"}}/>       
      </AppBar>
      <div className="contentWrapper">
      <Tagtable tags={tags}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} />
    </Paper>
    </Fragment>
  );
}

export default (Tag);