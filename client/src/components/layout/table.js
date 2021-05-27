import React ,{useRef}from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom"


const styles = {
    tableHead :{
      textAlign : 'center',
      fontWeight:"bold"
    },
    tableCell : {
        textAlign : 'center',
    },
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
        case "NONE":
          return (<div>문제 없음</div>)
    }
}



const Table = ({applys,tablenum})=> {

    console.log(applys)
    console.log(tablenum)
    return(
        <Typography color="textSecondary" align="center">
        {applys !==undefined
           ?<Table>
           <TableHead>
             <TableCell style={styles.tableHead}> 계약여부  </TableCell>
             <TableCell style={styles.tableHead}> 리뷰      </TableCell>
             <TableCell style={styles.tableHead}> 리뷰상태 </TableCell>
           </TableHead>
           <TableBody>
             {applys.map((apply) => (
               <TableRow  component={Link} to ={`/admin/apply/${apply.applyId}`} key={apply.applyId}>
                 <TableCell style={styles.tableCell}>{apply.isContracted === 1 ? "계약 완료" : "계약 전"}</TableCell>
                 <TableCell style={styles.tableCell}>{apply.review === null ? "-" : apply.review}</TableCell>
                 <TableCell style={styles.tableCell}>{reviewState(apply.reviewState)}</TableCell>
               </TableRow>
             ))
             }
           </TableBody>
         </Table>
           : null
            }
           
    {/*{pro.length===0 && tablenum===2
        ?null
        :<Table>
        <TableHead>
            <TableCell style = {styles.tableHead}> 제목 </TableCell>
            <TableCell style = {styles.tableHead}> 작성자</TableCell>
        </TableHead>
        <TableBody>
            {pro.map((board,index)=>(
            <TableRow component={Link} to ={`/admin/board/${board.boardId}`} key={board.boardId}>
                <TableCell style = {styles.tableCell}>{board.title}</TableCell>
                <TableCell style = {styles.tableCell}>{board.idString}</TableCell>
            </TableRow>  
            ))
        }
          </TableBody>
        </Table>
    }

        {pro.length===0 && tablenum===3
            ?null
            :<Table>
                <TableHead>
                    <TableCell style={styles.tableHead}> 소개 </TableCell>
                    <TableCell style={styles.tableHead}> 사용자</TableCell>

                </TableHead>
                {<TableBody>
                    {pro.map((profile)=>(
                      <TableRow component={Link} to ={`/admin/profile/${profile.profileId}`} key={profile.profileId}>
                        <TableCell style={styles.tableCell}>{profile.introduce}</TableCell>
                        <TableCell style={styles.tableCell}>{profile.userName}</TableCell>
                      </TableRow>  
                    ))}
                </TableBody>
                    }
                </Table>
            }

    {pro.length===0 && tablenum===4
    ?null
    :<Table>
    <TableHead>
        <TableCell style = {styles.tableHead}> 신고 내용 </TableCell>
        <TableCell style = {styles.tableHead}> 신고 상태 </TableCell>
        <TableCell style = {styles.tableHead}> 처리 결과</TableCell>

    </TableHead>
    
    <TableBody>
      {pro.map((report)=>
      (
  <TableRow  component={Link} to ={`/admin/report/${report.reportId}`}key={report.reportId}>
    <TableCell style={styles.tableCell}>{report.reportText}</TableCell>
    <TableCell style={styles.tableCell}>{report.reportState==="AFTER"?"처리 완료":"처리 전"}</TableCell>
    <TableCell style={styles.tableCell}>{report.reportState==="BEFORE"?"":reportresult(report.reportResult)}</TableCell>

  </TableRow>  
      ))           
    }
  
    </TableBody>
    
    </Table>
    }
*/}

          </Typography>
    )
}


export default Table;