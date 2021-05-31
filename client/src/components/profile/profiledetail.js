import React,{Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import Header from "../header/ProfileHeader"
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { PROFILE_DETAIL_REQUEST,PROFILE_CLOSE_REQUEST,PROFILE_OPEN_REQUEST } from "../../actions/profileAction";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const ProfileDetail = (req) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
       };    
  
    useEffect(()=>{
        dispatch({
            type:PROFILE_DETAIL_REQUEST,
            payload:req.match.params.id
        })
    },[dispatch,req.match.params.id])

    const {profileDetail} = useSelector((state) => state.profile);

    const closeprofile = () =>{
        var answer = window.confirm("프로필을 비공개 하시겠습니까?");
      
        if (answer) {
          dispatch({
            type:PROFILE_CLOSE_REQUEST,
            payload:{profileId:profileDetail.profileId, isOpen:0},
          },[])
          }
        
        else{
          alert("프로필 비공개에 실패하였습니다.")
        }  
    }

    const openprofile = () =>{
        var answer = window.confirm("프로필을 공개 하시겠습니까?");
      
        if (answer) {
          dispatch({
            type:PROFILE_OPEN_REQUEST,
            payload:{profileId:profileDetail.profileId, isOpen:1},
          },[])
          }
        
        else{
          alert("프로필 공개에 실패하였습니다.")
        }  
    }

    return(
        <Fragment>
      <Header/>
      <Paper className="paper-detail" elevation={3} style={{margin:"auto",marginTop:"70px",width:"65",borderRadius:"0px",    padding: "10px 30px 10px 10px"}}>
      <div className="contentWrapper-detail">
        <Typography color="textSecondary">
       <h2 className="profiletitle">
       <div> <span style={{float:"left", marginLeft:"10px"}}><ArrowBackIcon onClick={()=>goBack()}/></span>  <span className="titlename" style = {{marginLeft:"130px"}}>{profileDetail.userName}</span>  님의 프로필<span style={{float:"right", fontSize:"12px", position:"relative",top:"10px", left:"15px"}}>프로필 공개 여부: {profileDetail.isOpen===1 ?<span style={{color:"blue"}}>공개</span> : <span style={{color:"red"}}>비공개</span>}</span></div>
         
       </h2>
    <div style={{display:"flex"}}>
       <div className="info-div">
          <div className="profile-box">
          <span className="profile-label">blog</span>  <span className="profile-colon"> : </span> <span className="profile-blog-value">{profileDetail.blog}</span>
          </div>
          <div className="profile-box">
          <span className="profile-label">kakaoId</span> <span className="profile-colon"> : </span> <span className="profile-kakao-value">{profileDetail.kakaoId}</span>
          </div>
          <div className="profile-box">
          <span className="profile-label">workEmail</span> <span className="profile-colon">:</span> <span className="profile-workEmail-value">{profileDetail.workEmail}</span>
          </div>
        </div>
        <div className="skile-div">
        <span className="skile-label">기술스택</span>{Array.isArray(profileDetail.profileTagList) ?profileDetail.profileTagList.map(({tagName}) =>{
                                        return(
                                               
                                            <span className="profile_tag">{tagName}</span>
                                          
                                            )
                                        }) :""
        }
        </div>
     </div>
 

        
        <div className="introduce-div">
        <span   style={{marginLeft: "15px", fontWeight:"bold", marginTop:"20px"}}>자기 소개</span>
        <span className="introduce-detail">{profileDetail.introduce}</span>
        </div>
        
        <div className="profile-visibility-button" style={{textAlign:"center", marginBottom:"10px", paddingBottom:"20px" ,marginTop:"20px"}}>
           { profileDetail.isOpen===1 ? <Button variant="contained" color="secondary" onClick={ ()=> closeprofile()}>프로필 비공개</Button> : <Button variant="contained"   color="primary" onClick={() => openprofile()}>프로필 공개</Button>}
            </div>
        </Typography>
      </div>


    </Paper>

        </Fragment>
    )
}

export default ProfileDetail;