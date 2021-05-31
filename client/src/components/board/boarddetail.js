import React, {Fragment} from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {  useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"

import Divider from '@material-ui/core/Divider';
import { BOARD_DETAIL_REQUEST,BOARD_DELETE_REQUEST } from '../../actions/boardAction';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import "./board.css"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import Header from "../header/BoardHeader"

const BoardDetail = (req) =>{
    
    const boardid=Number(req.match.params.id)
    const dispatch = useDispatch();
    const {boardDetails} = useSelector((state) => state.board);
    const recEndDate = moment(boardDetails.recEndDate).format('YYYY-MM-DD')
    const workStartDate = moment(boardDetails.workStartDate).format('YYYY-MM-DD')
    const workEndDate = moment(boardDetails.workEndDate).format('YYYY-MM-DD')
    const recStartDate = moment(boardDetails.recStartDate).format('YYYY-MM-DD')
   
    const history = useHistory();

   
    useEffect(()=>{
    dispatch({
      type: BOARD_DETAIL_REQUEST,
      payload:boardid
    })
    },[boardid,dispatch])
   

const goBack = () => {
      history.goBack();
     };    


    const ondelete = () =>{

      try{
        var answer = window.confirm("모집글을 삭제하시겠습니까?");
      if (answer) 
      {
        dispatch({
          type:BOARD_DELETE_REQUEST,
          payload:boardid
        },[])
        }  
      }
    catch(e)
    {
    }

    }

    return(
        <Fragment>
          <Header/>
        <Paper className="paper-detail" elevation={3}>
          <div className="contentWrapper-detail">
            <Typography color="textSecondary">

            <h2 className="board_title" >
            <div> <span style={{float:"left", marginLeft:"10px"}}><ArrowBackIcon onClick={()=>goBack()}/></span> <span style={{fontSize:"21px"}}> {boardDetails.title} </span> <span style={{marginLeft:"5px",float:"right",fontSize:"15px",marginTop:"15px",color:"#CD5C5C"}}>{boardDetails.isDeleted===1?"삭제된 모집글":null}</span></div>
              </h2>

           <Divider style={{backgroundColor: "#E2E2E2"}}/>
            <div className="work_paper">

      <div className="upside">
            <div className="workdate"><span className="textlabel">업무일</span><span style={{marginTop:"10px"}}>{workStartDate}</span>~ <span>{workEndDate}</span></div>
            <div className="worknumber"><span className="textlabel">모집인원</span>  <span style={{marginTop:"10px"}}>{boardDetails.recNumber}명</span></div>
            <div className="workstart"><span className="textlabel">모집 기간</span>  <span style={{marginTop:"10px"}}>{recStartDate}</span> <span>~</span><span>{recEndDate}</span></div>
            <div className="payment"><span className="textlabel">최대 지급 비용</span>  <span style={{marginTop:"10px"}}>{boardDetails.paymentMax}원</span></div>
            <div className="payment"><span className="textlabel">모집글 작성일</span>  <span style={{marginTop:"10px"}}>{moment(boardDetails.createDate).format('YYYY-MM-DD')}</span></div>

      </div>
            <div className="reqireskile"><span className="textlabel2">필요기술 </span>  
            
            <div className="board_tag_div">   {Array.isArray(boardDetails.recruitmentBoardTagList) ? boardDetails.recruitmentBoardTagList.map(({tagName}) =>{
                                        return(
                                               
                                            <span className="board_tag">{tagName}</span>
                                          
                                            )
                                        }) :""}
            </div>
                        
            </div>
            <br/>
            <Divider style={{marginTop:"20px",backgroundColor: "#E2E2E2"}}/>

            <div className="board-body"> {boardDetails.text}</div>
            </div>
            <div className="board-delete-button" style={{textAlign:"center", marginBottom:"100px", paddingBottom:"20px" ,marginTop:"20px"}}>
           { boardDetails.isDeleted===1 ? "" : <Button variant="contained" onClick={() => ondelete()}>모집글 삭제</Button>}
            </div>
            </Typography>
          </div>
        </Paper>
        </Fragment>
    )
  }

export default BoardDetail;