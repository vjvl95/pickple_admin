
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
import { USER_UPLOAD_REQUEST,USER_DETAIL_REQUEST } from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {RouteComponentProps} from "react-router"
import theme from '../layout/theme'
import styles from '../layout/style'
import TextField from '@material-ui/core/TextField';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Header from '../header/UserHeader'
import "./user.css"

const UserDetailEdit = (req) => {

    const dispatch = useDispatch();
    const {usersDetail} = useSelector((state) => state.user);
    const [form,setVaule]=useState({email:""})

    useEffect(()=>{
      dispatch({
        type: USER_DETAIL_REQUEST,
        payload:req.match.params.id
      })

      setVaule({
          email:usersDetail.email
        })
      },[dispatch])

            const onupdate = () => {
                try{
                    var answer = window.confirm("회원정보를 수정하시겠습니까?")
                if(answer)
                {
                    dispatch({
                        type:USER_UPLOAD_REQUEST,
                        payload:{accountId:usersDetail.accountId,accountType:usersDetail.accountType, newEmail:form.email,newStudentId:"20513532"},
                    },[])
                    }  
                }
                catch(e)
                {
                    alert("회원정보 수정에 실패하였습니다.")
                }
                }
        

      const onChange=(e)=>{
        setVaule({
          ...form,
          [e.target.name]:e.target.value,
        });
      };

  return (
    <Fragment>

      <Header/>
    <Paper className="paper-detail" elevation={3}>
      <div className="contentWrapper-detail">
        <Typography color="textSecondary" align="center">
       <h2 className="usertitle">
          <span className="titlename">{usersDetail.name}</span>  정보 변경
        </h2>
       <Divider/>
        <div className="label">          
            <div className="userbody"> <span style={{position: "relative",top: "28px"}}>이메일 : </span></div>
        </div>

        <Fragment>
        <div  className="submitbutton" ><Button variant="contained" color="primary" style={{marginBottom:"25px",marginTop:"15px"}} onClick={()=>onupdate()}>회원수정</Button></div>
        </Fragment>
        
        </Typography>
      </div>
    </Paper>
    </Fragment>

  );
}


export default UserDetailEdit;