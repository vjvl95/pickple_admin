import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"

const Usertable =({users}) => {

    const styles = {
        tableHead :{
          textAlign : 'center',
        },
        tableCell : {
            textAlign : 'center',
        },
    }


    return(
        <Typography color="textSecondary" align="center">
                <Table>
                <TableHead>
                    <TableCell style = {styles.tableHead}> 회원 번호  </TableCell>
                    <TableCell style = {styles.tableHead}> 회원 아이디 </TableCell>
                    <TableCell style = {styles.tableHead}> 회원 이름</TableCell>
                    <TableCell style = {styles.tableHead}> 소속 경로</TableCell>

                </TableHead>

                <TableBody>
                    {users.map((user)=>(
                    <TableRow component={Link} to ={`/admin/user/${user.idString}`} key={user.accountId}>
                        <TableCell style = {styles.tableCell}>{user.accountId}</TableCell>
                        <TableCell style = {styles.tableCell}>{user.idString}</TableCell>
                        <TableCell style = {styles.tableCell}>{user.name}</TableCell>
                        <TableCell style = {styles.tableCell}>{user.registerType}</TableCell>
                    </TableRow>  
                    ))
                }
                  </TableBody>
                
                </Table>
        </Typography>
    )
}

export default (Usertable);