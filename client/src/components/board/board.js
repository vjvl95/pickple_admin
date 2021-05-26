
import React ,{useRef}from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { BOARD_LOADING_REQUEST,BOARD_SEARCH_REQUEST } from '../../actions/boardAction';
import {Link} from "react-router-dom"
import Boardtable from "./boardtable"
import Pagination from '../layout/Pagenation'
import { Fragment } from 'react';
import {Form,Input} from 'reactstrap'

const Board = () => {
  const resetValue=useRef(null)

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage]=useState(10);
  const {boards,totalElements} = useSelector((state) => state.board);
  const [form, setValues] = useState({keyword:""})

  console.log(totalElements)
  useEffect(()=>{
    dispatch({
      type: BOARD_SEARCH_REQUEST,
      payload:{pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
      currentPage:currentPage
    })
    },[currentPage])
   

    const onChange= (e) => {
      setValues(
          {
              ...form,
              [e.target.name]:e.target.value
          }
      )
  }


  const onSubmit = async(e) => {
    await e.preventDefault()
    const {keyword} = form
  
      dispatch({
        type: BOARD_SEARCH_REQUEST,
        payload:{keyword:keyword,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
        currentPage: currentPage
      })
}

  return (
    <Paper className="board-paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
          <Fragment>
    <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
            <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"30%"}}/>
            
            <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "50px", marginLeft:"20px" }} >
            검색
            </Button>      
    </div>
      </Fragment>  
          </Grid>
        </Grid>
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