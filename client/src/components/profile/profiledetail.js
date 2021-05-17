import React,{Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import Header from "../header/ProfileHeader"
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { USER_DETAIL_REQUEST } from "../../actions/userAction";
import { PROFILE_DETAIL_REQUEST } from "../../actions/profileAction";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";

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
    },[dispatch])

    const {profileDetail} = useSelector((state) => state.profile);


        console.log(profileDetail)
    return(
        <Fragment>
      <Header/>
      <Paper className="paper-detail" elevation={3} style={{margin:"auto",marginTop:"70px",width:"65",borderRadius:"0px",    padding: "10px 30px 10px 10px"}}>
      <div className="contentWrapper-detail">
        <Typography color="textSecondary">
       <h2 className="profiletitle">
       <div> <span style={{float:"left", marginLeft:"10px"}}><ArrowBackIcon onClick={()=>goBack()}/></span>  <span className="titlename">{profileDetail.userName}</span>  님의 프로필</div>
         
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
        
        
        </Typography>
      </div>
    </Paper>

        </Fragment>
    )
}

export default ProfileDetail;