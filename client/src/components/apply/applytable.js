import Table from '@material-ui/core/Table';
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

const Applytable = ({applys}) => {

    console.log(applys)
    return(
        <Typography color="textSecondary" align="center">
           {applys.length!==0 
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
          </Typography>
    )
}


export default Applytable