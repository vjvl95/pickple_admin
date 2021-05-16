import react from "react"
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Link} from "react-router-dom"
import Typography from '@material-ui/core/Typography';

const Boardtable = ({boards}) =>
{
    const styles = {
        tableHead :{
          textAlign : 'center',
        },
        tableCell : {
            textAlign : 'center',
        },
    }

    return (
        <Typography color="textSecondary" align="center">
        {boards.lenth===0
        ?null
        :<Table>
        <TableHead>
            <TableCell style = {styles.tableHead}> 모집글번호  </TableCell>
            <TableCell style = {styles.tableHead}> 제목 </TableCell>
            <TableCell style = {styles.tableHead}> 작성자</TableCell>
        </TableHead>
        <TableBody>
            {boards.map((board)=>(
            <TableRow component={Link} to ={`/admin/board/${board.boardId}`} key={board.boardId}>
                <TableCell style = {styles.tableCell}>{board.boardId}</TableCell>
                <TableCell style = {styles.tableCell}>{board.title}</TableCell>
                <TableCell style = {styles.tableCell}>{board.idString}</TableCell>
            </TableRow>  
            ))
        }
          </TableBody>
        </Table>
}
</Typography>
    )
}

export default Boardtable