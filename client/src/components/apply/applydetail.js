import React,{useEffect,useState,Fragment} from "react"
import { useDispatch, useSelector } from "react-redux"
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import {APPLY_DETAIL_REQUEST, REVIEW_ACCEPT_REQUEST,REVIEW_REJECT_REQUEST} from "../../actions/applyAction"
import { BOARD_DETAIL_REQUEST } from "../../actions/boardAction";
import "./apply.css"
import Button from '@material-ui/core/Button';

const Applydetail = (req) => {
    const applyId=Number(req.match.params.id)
    const dispatch = useDispatch();
    const {applydetails} = useSelector((state) => state.apply);
    const {text,title} = useSelector((state) => state.board);
    const history = useHistory();


    useEffect(()=>{
       dispatch({
          type: APPLY_DETAIL_REQUEST,
          payload:applyId
        })
        },[])
    
        useEffect(()=>{
            dispatch({
              type: BOARD_DETAIL_REQUEST,
              payload: applydetails.recruitmentBoardId
            })
        },[applydetails])


    const onaccept = () =>{
        try{
            var answer = window.confirm("리뷰를 승인하시겠습니까?");
          if (answer) 
          {
            dispatch({
              type:REVIEW_ACCEPT_REQUEST,
              payload:{params:{applyId:applydetails.applyId, reviewState:"ACCEPT"}},
            },[])
            }  
          }
        catch(e)
        {
            console.log(e)
        }
    }

    const onreject = () =>{
        try{
            var answer = window.confirm("리뷰를 반려하시겠습니까?");
          if (answer) 
          {
            dispatch({
              type:REVIEW_REJECT_REQUEST,
              payload:{params:{applyId:applydetails.applyId, reviewState:"REJECT"}},
            },[])
            }  
          }
        catch(e)
        {
            console.log(e)
        }
    }

    console.log(applydetails.recruitmentBoardId)


    return(
        <Fragment>
        <Paper className="apply-paper-detail" elevation={3} style={{padding:"20px"}}>
          <div className="contentWrapper-detail">
            <Typography color="textSecondary">
                <h2 style={{fontWeight:"bold", textAlign:"center"}}><span style={{ color: "#007bff"}}>{title}</span>에 대한 후기</h2>
            <div className="apply-board-detail-name" style= {{fontWeight:"bold", marginTop:"20px", padding:"5px"}}>
                모집글 내용
            </div>
            <div className="apply-board-detail-box" style={{   borderColor: "#e2e2e2",border:"1px solid", borderRadius:"0.5rem" , padding:"5px"}}>
                {text} 
            </div>      
        
            <div className="apply-review-detail-name" style= {{fontWeight:"bold", marginTop:"20px", padding:"5px"}}>
                리뷰 내용
            </div>

            <div className="apply-review-detail-box" style={{  borderColor: "#e2e2e2",border:"1px solid", borderRadius:"0.5rem" ,padding: "5px"}}>
                {applydetails.review===null ? "아직 리뷰가 작성되지 않았습니다." : applydetails.review }
            </div>

            {applydetails.reviewState==="WAITING"
            ?<Fragment>
             <div  className="reviewButton"  style={{textAlign:"center", marginTop: "30px", marginBottom:"20px"}}>
            <Button variant="contained" color="primary"  style={{marginRight:"20px"}} onClick={() => onaccept()}>리뷰 승인</Button>
            <Button variant="contained" color="secondary" style={{marginLeft:"20px"}} onClick={() => onreject()}>리뷰 반려</Button>
            </div>
            </Fragment>
            :<div className="space"> </div>
}
            
            
            </Typography>
          </div>
        </Paper>
        </Fragment>
    )
}


export default Applydetail;