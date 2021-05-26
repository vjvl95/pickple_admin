
import react from "react"
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Link} from "react-router-dom"
import Typography from '@material-ui/core/Typography';

const Reporttable = ({reports}) => {

    
    const styles = {
        tableHead :{
          textAlign : 'center',
          fontWeight:"bold"

        },
        tableCell : {
            textAlign : 'center',
            textOverflow: "ellipsis",
            whiteSpace:"nowrap",
            overflow:"hidden",
            maxWidth: "100px"

        },
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
    return(
    <Typography color="textSecondary" align="center">
    {reports.lenth===0
    ?null
    :<Table>
    <TableHead>
        <TableCell style = {styles.tableHead}> 신고 내용 </TableCell>
        <TableCell style = {styles.tableHead}> 신고 상태 </TableCell>
        <TableCell style = {styles.tableHead}> 처리 결과</TableCell>

    </TableHead>
    
    <TableBody>
      {reports.map((report)=>
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
</Typography>
)


}

export default Reporttable