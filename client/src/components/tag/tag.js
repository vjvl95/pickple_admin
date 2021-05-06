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
import SearchInput from './searchinput';
import { hot } from 'react-hot-loader'
import Pagination from '../layout/Pagenation'
import Tagadd from "./tagadd"
import { Fragment } from 'react';
const Tag = () => {
  const [post,setPosts]=useState([])
  const [currentPage, setCurrentPage]=useState(1)
  const [TagsPerPage, setTagsPerPage]=useState(5);
  const [id,setId]=useState(1)

  const {tags,totalElements,totalPages} = useSelector((state) => state.tag);

  
  const indexOfLastTag=currentPage*TagsPerPage
  const indexOfFirstTag=indexOfLastTag-TagsPerPage
  const currentTags=tags.slice(indexOfFirstTag,indexOfLastTag)
  
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({
      type: TAG_LOADING_REQUEST,
      payload:{params:{direction:"ASC", page:1, size:8}}
    })
    },[])


    console.log(tags)

    const onDeleteClick = (id,name) => {

      var answer = window.confirm(name+"을 삭제하시겠습니까?");
      if (answer) {
        dispatch({
          type:TAG_DELETE_REQUEST,
          payload:id,
        })
      }     
    }


  return (
    <Fragment>
    <Tagadd/>

    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className="block" color="inherit" />
            </Grid>
            <Grid item xs>
                <SearchInput className="searchInput" position="static" color="default"/>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Typography color="textSecondary" align="center">
                <Table>
                <TableHead>
                    <TableCell> 태그번호  </TableCell>
                    <TableCell> 태그내용 </TableCell>
                    <TableCell> 태그삭제</TableCell>
                </TableHead>
                <TableBody >
                    {tags.map((tag,index)=>(
                      <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{tag.tagName}</TableCell>
                        <TableCell><Button variant="contained" color="secondary" onClick={()=>onDeleteClick(tag.tagId , tag.tagName)}>삭제</Button></TableCell>
                      </TableRow>  

)             
)           
                    }
                </TableBody>
                </Table>
        </Typography>
      </div>
      <Pagination/>
    </Paper>
    </Fragment>
  );
}

export default hot(module)(Tag);