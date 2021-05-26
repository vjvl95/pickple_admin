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
import { REPORT_DETAIL_REQUEST,REPORT_MANAGE_REQUEST } from '../../actions/reportAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {RouteComponentProps} from "react-router"
import theme from '../layout/theme'
import styles from '../layout/style'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Header from '../header/ReportHeader'
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { BOARD_DELETE_REQUEST } from '../../actions/boardAction';
import {USER_DELETE_REQUEST} from "../../actions/userAction"
const Reportdetail = (req) =>{

    const dispatch = useDispatch();
    const {reportdetail} = useSelector((state) => state.report);
    const history = useHistory();
    const [reportState,setreportState]=React.useState('');
    const handleChange = (e) => {  
      setreportState(e.target.value);
    };
    
    const goBack = () => {
      history.goBack();
     };

    useEffect(()=>{
      dispatch({
        type: REPORT_DETAIL_REQUEST,
        payload:req.match.params.id
      })
      },[dispatch])

    const onSubmit = async(e) => {
      await e.preventDefault()
      console.log(reportState)
      if(reportState==="BOARD_DELETED")
      {
        dispatch({
          type: BOARD_DELETE_REQUEST,
          payload:reportdetail.boardid
        })
      }
      else if(reportState==="ACCOUNT_DELETED")
      {
        dispatch({
          type:USER_DELETE_REQUEST,
            payload:{idString:reportdetail.reportedString}
        })
      }

      else if(reportState==="BOARD_MODIFIED")
      {
        /*dispatch({
          type:USER_DELETE_REQUEST,
            payload:{idString:reportdetail.reportedString}
        })*/

      }

      else if(reportState==="GIVE_WARNING")
      {
       /* dispatch({
          type:USER_DELETE_REQUEST,
            payload:{idString:reportdetail.reportedString}
        })
        */
      }
    
      dispatch({
        type: REPORT_MANAGE_REQUEST,
        payload:{reportId:req.match.params.id, reportResult:reportState }
      })
  }



    return (
      <Fragment>
        <Paper className="apply-paper-detail" elevation={3} style={{padding:"20px"}}>
          <div className="contentWrapper-detail">
            <Typography color="textSecondary">
                <h2 style={{fontWeight:"bold", textAlign:"center"}}><span style={{ color: "#007bff"}}>{reportdetail.boardTitle}</span>에 대한 신고</h2>
            <div className="apply-board-detail-name" style= {{fontWeight:"bold", marginTop:"20px", padding:"5px"}}>
                모집글 내용
            </div>
            <div className="apply-board-detail-box" style={{   borderColor: "#e2e2e2",border:"1px solid", borderRadius:"0.5rem" , padding:"5px"}}>
          {reportdetail.boardText}
            </div>      
        
            <div className="apply-review-detail-name" style= {{fontWeight:"bold", marginTop:"20px", padding:"5px"}}>
                신고 내용
            </div>

            <div className="apply-review-detail-box" style={{  borderColor: "#e2e2e2",border:"1px solid", borderRadius:"0.5rem" ,padding: "5px"}}>
            {reportdetail.reportText}

            </div>
        {reportdetail.reportState==="BEFORE"
        ? <div className="select-div">
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reportState} onChange={handleChange} style={{width:"150px"}}>
          <MenuItem value="BOARD_DELETED">게시물 삭제</MenuItem>
          <MenuItem value="BOARD_MODIFIED">게시물 수정</MenuItem>
          <MenuItem value="ACCOUNT_DELETED">회원 삭제</MenuItem>
          <MenuItem value="GIVE_WARNING">회원 경고</MenuItem>
          <MenuItem value="NONE">문제없음</MenuItem>
        </Select>
        <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "50px", marginLeft:"30px" }} >
          처리
        </Button> 
        </div>     
        :<div className="select-div"></div>
        }
          </Typography>
      </div>
        </Paper>
     
        </Fragment>
      );
    }


    export default Reportdetail