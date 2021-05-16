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
import moment from 'moment';
import Button from '@material-ui/core/Button';
import "./board.css"

const BoardDetail = (req) =>{
    
    const boardid=Number(req.match.params.id)
    console.log(req.match.params.id)
    const dispatch = useDispatch();
    const {boardDetails} = useSelector((state) => state.board);
    const recEndDate = moment(boardDetails.recEndDate).format('YYYY-MM-DD')
    const workStartDate = moment(boardDetails.workStartDate).format('YYYY-MM-DD')
    const workEndDate = moment(boardDetails.workEndDate).format('YYYY-MM-DD')
    const recStartDate = moment(boardDetails.recStartDate).format('YYYY-MM-DD')
    useEffect(()=>{
    dispatch({
      type: BOARD_DETAIL_REQUEST,
      payload:boardid
    })
    },[])
   
    console.log(recEndDate)
    console.log(boardDetails)
    console.log(recStartDate)
    return(
        <Fragment>
        <Paper className="paper-detail" elevation={3}>
          <div className="contentWrapper-detail">
            <Typography color="textSecondary">
            <h2 className="board_title">{boardDetails.title}</h2>

           <Divider style={{backgroundColor: "#E2E2E2"}}/>
            <div className="work_paper">

      <div className="upside">
            <div className="workdate"><span className="textlabel">업무일</span><span style={{marginTop:"10px"}}>{workStartDate}</span>~ <span>{workEndDate}</span></div>
            <div className="worknumber"><span className="textlabel">모집인원</span>  <span style={{marginTop:"10px"}}>{boardDetails.recNumber}명</span></div>
            <div className="workstart"><span className="textlabel">모집 기간</span>  <span style={{marginTop:"10px"}}>{recStartDate}</span> <span>~</span><span>{recEndDate}</span></div>
            <br/>
            <div className="payment"><span className="textlabel">최대 지급 지용</span>  <span style={{marginTop:"10px"}}>{boardDetails.paymentMax}원</span></div>
      </div>
            <div className="reqireskile"><span className="textlabel2">필요기술 </span>  <div className="board_tag_div">   {Array.isArray(boardDetails.recruitmentBoardTagList) ? boardDetails.recruitmentBoardTagList.map(({tagName}) =>{
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
            
            </Typography>
          </div>
        </Paper>
        </Fragment>
    )
  }

export default BoardDetail;