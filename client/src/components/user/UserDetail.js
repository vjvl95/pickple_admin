
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { USER_LOADING_REQUEST, USER_DETAIL_REQUEST,USER_DELETE_REQUEST,USER_UPLOAD_REQUEST } from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {RouteComponentProps} from "react-router"
import theme from '../layout/theme'
import styles from '../layout/style'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Header from '../header/UserHeader'
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import "./user.css"

const UserDetail = (req) => {
    const dispatch = useDispatch();
    const {usersDetail} = useSelector((state) => state.user);
    const [form,setVaule]=useState({newemail:""})

    const history = useHistory();


    const goBack = () => {
      history.goBack();
     };



    useEffect(()=>{
      dispatch({
        type: USER_DETAIL_REQUEST,
        payload:req.match.params.id
      })
      
    
      },[dispatch])

      useEffect(()=>{
        setVaule({
          newemail:usersDetail.email
        })
      },[usersDetail.email])

      const onupdate = () => {
        try{
            var answer = window.confirm("회원정보를 수정하시겠습니까?")
        if(answer)
        {
            dispatch({
                type:USER_UPLOAD_REQUEST,
                payload:{accountId:usersDetail.accountId,accountType:usersDetail.accountType, newEmail:form.newemail,newStudentId:"20513532"},
            },[])
            }  
        }
        catch(e)
        {
            console.log(e)
        }
        }



      const ondelete = () => 
  {
        try{
          var answer = window.confirm(usersDetail.name+"을 삭제하시겠습니까?");
        if (answer) 
        {
          dispatch({
            type:USER_DELETE_REQUEST,
            payload:{idString:usersDetail.idString, name:usersDetail.name}
          },[])
          }  
        }
      catch(e)
      {
          console.log(e)
      }
   }

      const onChange=(e)=>
      {
        setVaule({
          ...form,
          [e.target.name]:e.target.value,
        });
      };
  return (
    <Fragment>
  
      <Header/>
    <Paper className="paper-detail" elevation={3} style={{margin:"auto",marginTop:"70px",width:"65"}}>
      <div className="contentWrapper-detail">
        <Typography color="textSecondary">
      
       <h2 className="usertitle" style={{display:"flex"}}>
       <ArrowBackIcon onClick={()=>goBack()} style={{marginLeft:"10px"}}/>
          <div style={{marginLeft:"250px"}}><span className="titlename" >{usersDetail.name}</span>  상세 조회</div>
        </h2>
       <Divider/>
      
    

      <div className="right">
      <div className="label">
            <div className="label2">
            <div className="userbody"><span className="userspan">회원 번호</span> <span  className="userspan2">:</span> <span className="userspan3">{usersDetail.accountId}</span></div>
            <div className="userbody"><span className="userspan">회원 타입</span> <span  className="userspan2">:</span> <span className="userspan3">{usersDetail.accountType}</span></div>
            <div className="userbody"><span className="userspan">회원 아이디</span> <span  className="userspan2">:</span> <span className="userspan3"> {usersDetail.idString}</span></div>
            <div className="userbody"><span className="userspan">회원 이름</span> <span  className="userspan2">:</span> <span className="userspan3"> {usersDetail.name}</span></div>
            <div className="userbody"><span className="userspan-email">이메일</span> <span  className="userspan-email2">:</span> <span className="userspan3">{usersDetail.isDeleted===0 ?<TextField className="emailinput"id="outlined-basic" label="email" name="newemail" variant="outlined" value={form.newemail} onChange={onChange}  size="small"/> :<span style={{marginTop:"7px", marginBottom:"7px"}}>{usersDetail.email}</span>}</span></div>
            <div className="userbody"><span className="userspan">삭제여부</span> <span  className="userspan2">:</span> <span className="userspan3">{usersDetail.isDeleted===0 ? "회원" : "탈퇴회원"}</span></div>
            <div className="userbody"><span className="userspan">인증 여부</span> <span  className="userspan2">:</span> <span className="userspan3">{usersDetail.isCertified===0 ? "인증안됨" : "인증"}</span></div>
            <div className="userbody"><span className="userspan">가입경로</span> <span  className="userspan2">:</span> <span className="userspan3">{usersDetail.registerType}</span> </div>
            
            {usersDetail.isDeleted===0
            ?<Fragment>
             <div  className="userbutton" ><Button variant="contained" color="secondary" style={{marginBottom:"25px",marginTop:"15px"}} onClick={()=>ondelete()}>회원 삭제</Button>
            <Button variant="contained" color="primary"  style={{marginBottom:"25px",marginTop:"15px",marginLeft:"30px"}} onClick={()=>onupdate()}>회원 수정</Button>
            </div>
            </Fragment>
            :<div className="space"> </div>
}
</div>

        </div>
      </div>

        
        
        
        
        </Typography>
      </div>
    </Paper>
    </Fragment>

  );
}

export default UserDetail;