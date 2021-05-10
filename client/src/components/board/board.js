
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


const Board = () => {

  const dispatch = useDispatch();
  const {boards} = useSelector((state) => state.board);
  useEffect(()=>{
    dispatch({
      type: BOARD_LOADING_REQUEST,
      payload:{params:{direction:"ASC", page:1, size:10}}
    })
    },[dispatch,boards.boardId])
   
  return (
    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className="block" color="inherit" />
            </Grid>
            <Grid item xs>
              {/*  <SearchInput className="searchInput" position="static" color="default"/>
               <TextField
                fullWidth
                placeholder="태그를 입력하세요"
                InputProps={{
                  disableUnderline: true,
                  className: "searchInput",
                }}
              /> */}
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Typography color="textSecondary" align="center">
                <Table>
                <TableHead>
                <TableCell> 모집글번호  </TableCell>
                    <TableCell> 제목 </TableCell>
                    <TableCell> 작성자</TableCell>
                </TableHead>
                <TableBody>
                    {boards.map((board)=>(
                    <TableRow component={Link} to ={`/admin/board/${board.boardId}`} key={board.boardId}>
                        <TableCell>{board.boardId}</TableCell>
                        <TableCell>{board.title}</TableCell>
                        <TableCell>{board.idString}</TableCell>
                    </TableRow>  
                    ))
                }
                  </TableBody>
                
                </Table>
        </Typography>
      </div>
    </Paper>
  );
}

export default Board;