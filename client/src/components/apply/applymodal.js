import React, { useState,useEffect,Fragment} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux"
import {APPLY_DETAIL_REQUEST, REVIEW_ACCEPT_REQUEST,REVIEW_REJECT_REQUEST} from "../../actions/applyAction"
import { BOARD_DETAIL_REQUEST } from "../../actions/boardAction";

import "./apply.css"
const ApplyModal = (props) => {

    const dispatch = useDispatch();
    const [open,setOpen]=props.useOpen
    const applydetails=props.applydetails
    const text = props.text
    const title = props.title
   

    const handleClose = () => {
        setOpen(false);
      };

      const toggle = () => setOpen(!open);

      const onaccept = () =>{
        try{
            var answer = window.confirm("리뷰를 승인하시겠습니까?");
          if (answer) 
          {
            dispatch({
              type:REVIEW_ACCEPT_REQUEST,
              payload:{applyId:applydetails.applyId, reviewState:"ACCEPT"}
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
              payload:{applyId:applydetails.applyId, reviewState:"REJECT"},
            },[])
            }  
          }
        catch(e)
        {
            console.log(e)
        }
    }




    return(
        <Modal isOpen={open} toggle={toggle} size="lg" onClose={handleClose} centered="true" contentClassName="custom-modal-style" style={{padding:"30px"}}>
            <Typography color="textSecondary">
                <h2 style={{fontWeight:"bold", textAlign:"center"}}><span style={{ color: "#007bff"}}>{title}</span>에 대한 후기</h2>
            <div className="apply-board-detail-name" style= {{fontWeight:"bold", marginTop:"20px", padding:"5px"}}>
                모집글 내용
            </div>
            <div className="apply-detail-box" style={{border:"1px solid", borderRadius:"0.5rem" , padding:"5px", minHeight:"100px",borderColor: "#e2e2e2"}}>
                {text} 
            </div>      
        
            <div className="apply-review-detail-name" style= {{fontWeight:"bold", marginTop:"20px", padding:"5px"}}>
                리뷰 내용
            </div>

            <div className="apply-detail-box" style={{  border:"1px solid", borderRadius:"0.5rem" ,padding: "5px", minHeight:"100px",borderColor: "#e2e2e2"}}>
                {applydetails.review===null ? "아직 리뷰가 작성되지 않았습니다." : applydetails.review }
            </div>

            {applydetails.reviewState==="WAITING"
            ?<Fragment>
             <div  className="reviewButton"  style={{textAlign:"center", marginTop: "70px", marginBottom:"20px"}}>
            <Button variant="contained" color="primary"  style={{marginRight:"20px"}} onClick={() => onaccept()}>리뷰 승인</Button>
            <Button variant="contained" color="secondary" style={{marginLeft:"20px"}} onClick={() => onreject()}>리뷰 반려</Button>
            </div>
            </Fragment>
            :<div className="space"> </div>
}
            
            
            </Typography>
        </Modal>
    )
}

export default ApplyModal