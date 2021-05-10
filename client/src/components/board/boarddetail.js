import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { USER_LOADING_REQUEST,TAG_DELETE_REQUEST } from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {RouteComponentProps} from "react-router"
import theme from '../layout/theme'
import styles from '../layout/style'
import Divider from '@material-ui/core/Divider';
import { BOARD_DETAIL_REQUEST } from '../../actions/boardAction';

import Button from '@material-ui/core/Button';
import "./board.css"

const BoardDetail = (req) =>{
    
    const boardid=Number(req.match.params.id)
    console.log(req.match.params.id)
    const dispatch = useDispatch();
    const {tilte,text,boardtype,isDeleted,paymentMax,workStartDate,workEndDate,BoardTagList} = useSelector((state) => state.board);
    useEffect(()=>{
    dispatch({
      type: BOARD_DETAIL_REQUEST,
      payload:boardid
    })
    },[])
   


    return(


        <Fragment>
      
        <Paper className="paper-detail" elevation={3}>
          <div className="contentWrapper-detail">
            <Typography color="textSecondary" align="center">
            <h2 className="board_title">title</h2>

           <Divider className="line"/>
            <div className="label">

            <div>게시글 번호:</div>
            <div>게시글 삭제여부:</div>
            <div>모집 마깁일:</div>
            <div>모집 시작일:</div>
            <div>본문:</div>
            </div>
            </Typography>
          </div>
        </Paper>
        </Fragment>
    )
  }

export default BoardDetail;