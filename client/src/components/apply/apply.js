
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
import SearchInput from '../tag/searchinput';


const Board = () => {

  const dispatch = useDispatch();
  const {tags} = useSelector((state) => state.tag);
  useEffect(()=>{
    dispatch({type: TAG_LOADING_REQUEST})
    },[dispatch])
   
 

    const onDeleteClick = (name) => {
      dispatch({
        type:TAG_DELETE_REQUEST,
        payload:{name},
      })

    }
  return (
    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className="block" color="inherit" />
            </Grid>
            <Grid item xs>
                <SearchInput className="searchInput" position="static" color="default"/>
              {/* <TextField
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
                   
                </TableBody>
                </Table>
        </Typography>
      </div>
    </Paper>
  );
}

export default Board;