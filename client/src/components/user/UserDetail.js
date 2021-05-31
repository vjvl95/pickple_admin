
import React, {Fragment} from 'react';
import { useHistory } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { USER_DETAIL_REQUEST,USER_DELETE_REQUEST,USER_UPLOAD_REQUEST } from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Header from '../header/UserHeader'
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import "./user.css"
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,  

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));





const UserDetail = (req) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {usersDetail} = useSelector((state) => state.user);
    const [form,setVaule]=useState({newemail:"",accountType:"",newStudentId:""})

    const history = useHistory();

    const goBack = () => {
      history.goBack();
     };

     const checkEmail = (email) => {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      // 검증에 사용할 정규식 변수 regExp에 저장
    
      if (email.match(regExp) != null) {
        return true;
      }
      else {
        return false;
      }
    
    }
    useEffect(()=>{
      dispatch({
        type: USER_DETAIL_REQUEST,
        payload:req.match.params.id
      })
      
    
      },[dispatch,req.match.params.id])

      useEffect(()=>{
        if(usersDetail.studentId===undefined)
          {
            setVaule({
              newemail:usersDetail.email,
              accountType:usersDetail.accountType,
              newStudentId:""
            })
          }
        else{
          setVaule({
            newemail:usersDetail.email,
            accountType:usersDetail.accountType,
            newStudentId:usersDetail.studentId
          })
        }
      },[usersDetail.email,usersDetail.accountType,usersDetail.studentId])

      const onupdate = () => {
        
        try{
            var answer = window.confirm("회원정보를 수정하시겠습니까?")
        if(answer)
        {
          if(!checkEmail(form.newemail)){
            alert("잘못된 이메일 형식입니다.")
          }
          else if(form.newStudentId.length<8){
            alert("학번은 최소 8글자 이상입니다.")
          }
          else
          {
            dispatch({
                type:USER_UPLOAD_REQUEST,
                payload:{accountId:usersDetail.accountId,accountType:form.accountType, newEmail:form.newemail,newStudentId:form.newStudentId},
            },[])
          }
      }  
        }
        catch(e)
        {
          alert("회원정보수정에 실패하였습니다.")
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
        alert("회원 삭제에 실패하였습니다.")
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
            <div className="userbody"><span className="userspan" style={{marginTop:"25px"}}>회원 타입</span> <span  className="userspan2" style={{marginTop:"25px"}}>:</span> 
            <FormControl className={classes.formControl} style={{bottom:"15px", position:"relative",left:"-30px"}} >
                <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>회원타입</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={form.accountType}  name="accountType" onChange={onChange} style={{width:"100px", marginLeft:"1.5rem"}}>
                  <MenuItem value="MEMBER">멤버</MenuItem>
                  <MenuItem value="ADMIN">관리자</MenuItem>
                </Select>
            </FormControl>
            </div>
            <div className="userbody"><span className="userspan">회원 학번</span> <span  className="userspan2">:</span> <span className="userspan3"> <TextField className="emailinput"id="outlined-basic" label="학번" name="newStudentId" variant="outlined" value={form.newStudentId} onChange={onChange}  size="small" style={{top:"-5px"}}/></span></div>

            <div className="userbody"><span className="userspan">회원 아이디</span> <span  className="userspan2">:</span> <span className="userspan3"> {usersDetail.idString}</span></div>
            <div className="userbody"><span className="userspan" >회원 이름</span> <span  className="userspan2" >:</span> <span className="userspan3"> {usersDetail.name}</span></div>
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