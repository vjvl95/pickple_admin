import React, {Fragment} from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { REPORT_DETAIL_REQUEST,REPORT_MANAGE_REQUEST } from '../../actions/reportAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Header from '../header/ReportHeader'
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const Reportdetail = (req) =>{

    const dispatch = useDispatch();
    const {reportdetail} = useSelector((state) => state.report);
    const history = useHistory();
    const [reportState,setreportState]=React.useState('');
  console.log(req)
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
  
    
      dispatch({
        type: REPORT_MANAGE_REQUEST,
        payload:{reportId:req.match.params.id, reportResult:reportState }
      })
  }

  const reportresult = (result) =>{
    console.log(result)
    switch (result) {
      case "BOARD_DELETED":
        return (<div>게시글 삭제</div>)
      case "BOARD_MODIFIED":
        return (<div>게시글 수정</div>)
      case "ACCOUNT_DELETED":
        return (<div>회원 삭제</div>)
      case "GIVE_WARNING":
        return (<div>경고 조치</div>)
      case "NONE":
         return (<div>문제 없음</div>)
    }
}


    return (
      <Fragment>
        <Paper className="apply-paper-detail" elevation={3} style={{padding:"20px"}}>
          <div className="contentWrapper-detail">
            <Typography color="textSecondary">
                <h2 style={{fontWeight:"bold", textAlign:"center"}}>
                <div> <span style={{float:"left", marginLeft:"10px"}}><ArrowBackIcon onClick={()=>goBack()}/></span>                  </div>

                  <span style={{ color: "#007bff"}}>{reportdetail.boardTitle}</span>에 대한 신고
                </h2>
                <div className="report-upside">
            <div className="report-div"><span className="textlabel" style={{marginBottom:"10px"}}>신고인</span> <Link to = {`/admin/user/${reportdetail.reporterString}`}><span>{reportdetail.reporterString}</span></Link></div>
            <div className="reported-div"><span className="textlabel" style={{marginBottom:"10px"}}>모집글 글쓴이</span>  <Link to = {`/admin/user/${reportdetail.reportedString}`}><span >{reportdetail.reportedString}</span></Link></div>
            <div className="reportdate"><span className="textlabel" style={{marginBottom:"10px"}}>신고 날짜</span>  <span >2020-05-21</span> </div>
           </div>
           
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
        :<div className="select-div" style={{    fontSize: "25px"}}>
          <span style={{marginRight:"20px", fontSize:"25px"}}>처리 결과 </span> : <span style={{marginLeft:"20px", fontSize:"25px" , color:"rgb(0, 123, 255)"}}> {reportresult(reportdetail.reportResult)}</span>
        </div>
        }
          </Typography>
      </div>
        </Paper>
     
        </Fragment>
      );
    }


    export default Reportdetail