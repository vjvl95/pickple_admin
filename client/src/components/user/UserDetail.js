
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
import { USER_LOADING_REQUEST, USER_DETAIL_REQUEST,USER_DELETE_REQUEST } from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {RouteComponentProps} from "react-router"
import theme from '../layout/theme'
import styles from '../layout/style'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Header from '../header/UserHeader'
import "./user.css"

const UserDetail = (req) => {

    const dispatch = useDispatch();
    const {account_id,account_type,email,idString,is_certifited,is_deleted,name,register_type} = useSelector((state) => state.user);
    useEffect(()=>{
      dispatch({
        type: USER_DETAIL_REQUEST,
        payload:req.match.params.id
      })
      },[dispatch])

      const ondelete = () => {
        try{
          var answer = window.confirm(name+"을 삭제하시겠습니까?");
        if (answer) 
        {
          dispatch({
            type:USER_DELETE_REQUEST,
            payload:{idString:idString, name:name}
          },[])
          }  
        }
      catch(e)
      {
          console.log(e)
      }

      }
  return (
    <Fragment>

      <Header/>
    <Paper className="paper-detail" elevation={3}>
      <div className="contentWrapper-detail">
        <Typography color="textSecondary" align="center">
       <h2 className="usertitle">
          <span className="titlename">{name}</span>  상세 조회
        </h2>
       <Divider className="line"/>
        <div className="label">
            <div className="userbody">회원 번호: {account_id}</div>
            <div className="userbody">회원 아이디: {idString}</div>
            <div className="userbody">회원 이름: {name}</div>
            <div className="userbody">이메일 : {email}</div>
            <div className="userbody">회원 등급 : {account_type}</div>
            <div className="userbody">삭제 여부 : {is_deleted===0 ? "회원" : "탈퇴회원"}</div>
            <div className="userbody">인증 여부 : {is_certifited===0 ? "인증안됨" : "인증"}</div>
            <div className="userbody">가입경로 : {register_type}</div>
        </div>
        
        {is_deleted===0
        ?<div  className="userbutton" ><Button variant="contained" color="secondary" style={{marginBottom:"25px",marginTop:"15px"}} onClick={()=>ondelete()}>회원 삭제</Button></div>
        :<div className="space"> </div>
        }

        
        </Typography>
      </div>
    </Paper>
    </Fragment>

  );
}

export default UserDetail;