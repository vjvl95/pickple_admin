
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
import { USER_LOADING_REQUEST,TAG_DELETE_REQUEST, USER_DETAIL_REQUEST } from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import SearchInput from '../tag/searchinput';
import { Link } from "react-router-dom";
import {RouteComponentProps} from "react-router"
import theme from '../layout/theme'
import styles from '../layout/style'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const UserDetail = (req) => {

    const dispatch = useDispatch();
    console.log(req.match.params.id)
    const {users} = useSelector((state) => state.user);
    useEffect(()=>{
      dispatch({
        type: USER_DETAIL_REQUEST,
        payload:req.match.params.id
      })
      },[dispatch])

  return (
    <Fragment>
      
    <Paper className="paper-detail" elevation={3}>
      <div className="contentWrapper-detail">
        <Typography color="textSecondary" align="center">
       <h2>사용자 상세 조회</h2>
       <Divider className="line"/>
        <div className="label">
        <div>회원 아이디:</div>
        <div>회원 이름:</div>
        <div>회원 등급:</div>
        <div>삭제 여부:</div>
        <div>회원 번호:</div>
        <div>인증 여부:</div>
        <div>가입경로: </div>
        </div>
        <div className="userbutton"><Button variant="contained" color="secondary">회원 삭제</Button></div>
        </Typography>
      </div>
    </Paper>
    </Fragment>

  );
}

export default UserDetail;