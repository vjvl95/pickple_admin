
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
import { APPLY_LOADING_REQUEST } from '../../actions/applyAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Modal from '@material-ui/core/Modal';
import {Link} from "react-router-dom"


const Board = () => {
  const [modal, setModal] = useState(false)

  const dispatch = useDispatch();
  const {applys} = useSelector((state) => state.apply);
  useEffect(()=>{
    dispatch({
      type: APPLY_LOADING_REQUEST,
      payload:{params:{direction:"ASC", page:1, size:10}}   
     })
    },[dispatch])
   
 
    console.log(applys)
  
  return (
    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className="block" color="inherit" />
            </Grid>
            <Grid item xs>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Typography color="textSecondary" align="center">
                <Table>
                <TableHead>
                    <TableCell> 지원번호  </TableCell>
                    <TableCell> 계약여부  </TableCell>
                    <TableCell> 리뷰      </TableCell>
                    <TableCell> 리뷰상태</TableCell>
                    <TableCell> </TableCell>

                </TableHead>
                <TableBody>
                {applys.map((apply)=>(
            <TableRow component={Link} to ={`/admin/apply/${apply.applyId}`} key={apply.applyId}>
                <TableCell >{apply.applyId}</TableCell>
                <TableCell>{apply.isContracted===1?"계약 완료" : "계약 전"}</TableCell>
                <TableCell>{apply.review===null?"리뷰 작성 전":apply.review }</TableCell>
                <TableCell>{apply.reviewState}</TableCell>

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