import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom"
import {useDispatch} from "react-redux"
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { TAG_DELETE_REQUEST } from '../../actions/tagAction';
import TableContainer from '@material-ui/core/TableContainer';

const styles = {
    tableHead :{
      textAlign : 'center',
      fontWeight:"bold"
    },
    tableCell : {
        textAlign : 'center',
    },
    tableCell_long : {
      textAlign : 'center',
      textOverflow: "ellipsis",
      whiteSpace:"nowrap",
      overflow:"hidden",
      maxWidth: "100px"
    }
}

const reviewState = (reviewstate) => 
{
    switch (reviewstate) {
      case "BEFORE":
        return (<div>리뷰 작성 전</div>)
      case "WAITING":
        return (<div>리뷰 승인 대기</div>)
      case "ACCEPT":
        return (<div>리뷰 승인</div>)
      case "REJECT":
        return (<div>리뷰 반려</div>)
      default :
        return null
    }
}

const reportresult = (result) =>{
    switch (result) {
      case "BOARD_DELETED":
        return (<div>게시글 삭제</div>)
      case "BOARD_MODIFIED":
        return (<div>게시글 수정</div>)
      case "ACCOUNT_DELETED":
        return (<div>회원 삭제</div>)
      case "GIVE_WARNING":
        return (<div>경고 조치</div>)
      case "NO_PROBLEM":
          return (<div>문제 없음</div>)
      case "NONE":
          return(<div></div>)
      default :
          return null
    }
}

const registerType = (registerType) => {

  switch (registerType) {
      case "PICKPLE":
        return (<div>픽플</div>)
      case "NAVER":
        return (<div>네이버</div>)
      case "SE":
        return (<div>소공</div>)
      default :
        return null
    }


}

const Tablelayout = (props)=> {
  const dispatch = useDispatch();

  const onDeleteClick = (id,name) => {
    var answer = window.confirm(name+"을 삭제하시겠습니까?");
    if (answer) {
      dispatch({
        type:TAG_DELETE_REQUEST,
        payload:id,
      })
    }     
  }
    return(
      <div>
      <TableContainer>
        {
          (function(){
            if(props.tablenum===1) return(
        <Table>
           <TableHead>
             <TableRow>
                <TableCell style={styles.tableHead}> 계약여부  </TableCell>
                <TableCell style={styles.tableHead}> 리뷰      </TableCell>
                <TableCell style={styles.tableHead}> 리뷰상태 </TableCell>
             </TableRow>
           </TableHead>
          
           <TableBody>

             {props.applys.map((apply) => (
               <TableRow  key={apply.applyId}>
                 <TableCell width="17.5%" style={styles.tableCell}><Link to={`/admin/apply/${apply.applyId}`} style={{ textDecoration: 'none', color: 'black' }}>{apply.isContracted === 1 ? "계약 완료" : "계약 전"}</Link></TableCell>
                 <TableCell width="65%" style={styles.tableCell}><Link to={`/admin/apply/${apply.applyId}`} style={{ textDecoration: 'none', color: 'black' }}>{apply.review === null ? "-" : apply.review}</Link></TableCell>
                 <TableCell width="17.5%"style={styles.tableCell}><Link to={`/admin/apply/${apply.applyId}`} style={{ textDecoration: 'none', color: 'black' }}>{reviewState(apply.reviewState)}</Link></TableCell>
               </TableRow>
             ))
             }
           </TableBody>
         </Table>
            )
            else if(props.tablenum===2)
            return(
                        <Table>
                        <TableHead>
                            <TableCell style = {styles.tableHead}> 제목 </TableCell>
                            <TableCell style = {styles.tableHead}> 작성자</TableCell>
                        </TableHead>
                        <TableBody>
                            {props.boards.map((board)=>(
                            <TableRow component={Link} to ={`/admin/board/${board.boardId}`} key={board.boardId}>
                                <TableCell width="65%" style = {styles.tableCell_long}>{board.title}</TableCell>
                                <TableCell width="35%" style = {styles.tableCell_long}>{board.idString}</TableCell>
                            </TableRow>  
                            ))
                            }
                          </TableBody>
                        </Table>
            )
            else if(props.tablenum===3)
            return(
                      <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell style={styles.tableHead}> 소개 </TableCell>
                              <TableCell style={styles.tableHead}> 사용자</TableCell>
                             </TableRow>
                          </TableHead>

                          {<TableBody>
                              {props.profiles.map((profile)=>(
                                <TableRow key={profile.profileId}>
                                  <TableCell  width="70%" style={styles.tableCell_long}><Link to ={`/admin/profile/${profile.profileId}`} style={{ textDecoration: 'none', color: 'black' }}>{profile.introduce}</Link></TableCell>
                                  <TableCell  width="30%" style={styles.tableCell}><Link to ={`/admin/profile/${profile.profileId}`} style={{ textDecoration: 'none', color: 'black' }}>{profile.userName}</Link></TableCell>
                                </TableRow>  
                              ))}
                          </TableBody>
                              }
                        </Table>
                    )
            
            else if(props.tablenum===4)
            return(
                      <Table>
                          <TableHead>
                              <TableCell style={styles.tableHead}>
                                  신고 내용
                              </TableCell>
                              <TableCell style={styles.tableHead}>
                                  신고 상태
                              </TableCell>
                              <TableCell style={styles.tableHead}>
                                  처리 결과</TableCell>
                          </TableHead>

                          <TableBody>
                              {props.reports.map((report)=> (
                              <TableRow component={Link} to={`/admin/report/${report.reportId}`} key={report.reportId}>
                                  <TableCell width="70%" style={styles.tableCell_long}>{report.reportText}</TableCell>
                                  <TableCell width="15%" style={styles.tableCell}>{report.reportState==="AFTER"?"처리 완료":"처리 전"}</TableCell>
                                  <TableCell width="15%" style={styles.tableCell}>{report.reportState==="BEFORE"?"-":reportresult(report.reportResult)}</TableCell>
                              </TableRow>
                              )) }

                          </TableBody>
                      </Table>
                   )

            else if(props.tablenum===5)
            return(
              <Table>
        <TableHead >
        <TableRow>

            <TableCell style = {styles.tableHead}> 태그내용 </TableCell>
            <TableCell style = {styles.tableHead}> 추가일자</TableCell>
            <TableCell style = {styles.tableHead}> 태그삭제</TableCell>
            </TableRow>

       </TableHead>
        <TableBody >
            {props.tags.map((tag,index)=>(
              <TableRow key={index}>
                <TableCell style = {styles.tableCell}>{tag.tagName}</TableCell>
                <TableCell style = {styles.tableCell}>{moment(tag.createDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell style = {styles.tableCell}><Button variant="contained" color="secondary" onClick={()=>onDeleteClick(tag.tagId , tag.tagName)}>삭제</Button></TableCell>
              </TableRow>  
            )             
            )           
}
     
        </TableBody>
        </Table>
            )
            else if(props.tablenum===6)
            return(
<Table>
    <TableHead>
    <TableRow>
        <TableCell style={styles.tableHead}>  회원 아이디 </TableCell>
        <TableCell style={styles.tableHead}>  회원 이름</TableCell>
        <TableCell style={styles.tableHead}>  소속 경로</TableCell>
      
      </TableRow>
    </TableHead>

    <TableBody>
        {props.users.map((user)=>(
        <TableRow component={Link} to={`/admin/user/${user.idString}`} key={user.accountId}>
            <TableCell style={styles.tableCell}>{user.idString}</TableCell>
            <TableCell style={styles.tableCell}>{user.name}</TableCell>
            <TableCell style={styles.tableCell}>{registerType(user.registerType)}</TableCell>
        </TableRow>
        )) }
    </TableBody>
</Table>
            )
            else
              return(null)
          })()

    
            }
    </TableContainer>

    </div>
        )
}


export default Tablelayout;