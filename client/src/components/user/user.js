
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
import SearchInput from '../tag/searchinput';
import {Link} from "react-router-dom"

const User = () => {

    const dispatch = useDispatch();
    const {users} = useSelector((state) => state.user);
    useEffect(()=>{
      dispatch({
        type: USER_LOADING_REQUEST,
        payload:{params:{direction:"ASC", page:"1", size:"10"}}
      })
      },[dispatch,users.userid])
  
      console.log(users)
 
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
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Typography color="textSecondary" align="center">
                <Table>
                <TableHead>
                    <TableCell> 회원 번호  </TableCell>
                    <TableCell> 회원 아이디 </TableCell>
                    <TableCell> 회원 이름</TableCell>
                    <TableCell> 소속 경로</TableCell>

                </TableHead>

                <TableBody>
                    {users.map((user)=>(
                    <TableRow component={Link} to ={`/admin/user/${user.idString}`} key={user.accountId}>
                        <TableCell>{user.accountId}</TableCell>
                        <TableCell>{user.idString}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.register_type}</TableCell>
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


export default (User);