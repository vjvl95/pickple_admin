
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
    const {usersDetail} = useSelector((state) => state.user);
    useEffect(()=>{
      dispatch({
        type: USER_DETAIL_REQUEST,
        payload:req.match.params.id
      })
      },[dispatch])

      const ondelete = () => {
        try{
          var answer = window.confirm(usersDetail.name+"을 삭제하시겠습니까?");
        if (answer) 
        {
          dispatch({
            type:USER_DELETE_REQUEST,
            payload:{idString:UserDetail.idString, name:UserDetail.name}
          },[])
          }  
        }
      catch(e)
      {
          console.log(e)
      }

      }
      console.log(usersDetail)
  return (
    <Fragment>

      <Header/>
    <Paper className="paper-detail" elevation={3}>
      <div className="contentWrapper-detail">
        <Typography color="textSecondary" align="center">
       <h2 className="usertitle">
          <span className="titlename">{usersDetail.name}</span>  상세 조회
        </h2>
       <Divider/>
        <div className="label">
            <div className="userbody">회원 번호: {usersDetail.accountId}</div>
            <div className="userbody">회원 아이디: {usersDetail.idString}</div>
            <div className="userbody">회원 이름: {usersDetail.name}</div>
            <div className="userbody">이메일 : {usersDetail.email}</div>
            <div className="userbody">회원 등급 : {usersDetail.accountType}</div>
            <div className="userbody">삭제 여부 : {usersDetail.isDeleted===0 ? "회원" : "탈퇴회원"}</div>
            <div className="userbody">인증 여부 : {usersDetail.isCertified===0 ? "인증안됨" : "인증"}</div>
            <div className="userbody">가입경로 : {usersDetail.registerType}</div>
        </div>
        
        {usersDetail.isDeleted===0

        ?<Fragment>
        <div  className="userbutton" ><Button variant="contained" color="secondary" style={{marginBottom:"25px",marginTop:"15px"}} onClick={()=>ondelete()}>회원 삭제</Button>
        <Link to={`/admin/user/${usersDetail.idString}/edit`}>
        <Button variant="contained" color="primary" style={{marginBottom:"25px",marginTop:"15px",marginLeft:"30px"}}>회원 수정</Button>
          </Link>
        </div>
        </Fragment>
        :<div className="space"> </div>
        }

        
        </Typography>
      </div>
    </Paper>
    </Fragment>

  );
}

export default UserDetail;