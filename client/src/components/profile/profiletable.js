import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import { } from '../../actions/tagAction';
import {useDispatch, useSelector} from "react-redux"

import {Link} from "react-router-dom"

const Profiletable = ({profiles}) =>{
    
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

    return(
        <Typography color="textSecondary" align="center">
            {profiles.length===0
            ?null
            :<Table>
                <TableHead>
                    <TableCell style={styles.tableHead}> 소개 </TableCell>
                    <TableCell style={styles.tableHead}> 사용자</TableCell>

                </TableHead>
                {<TableBody>
                    {profiles.map((profile)=>(
                      <TableRow component={Link} to ={`/admin/profile/${profile.profileId}`} key={profile.account_id}>
                        <TableCell style={styles.tableCell}>{profile.introduce}</TableCell>
                        <TableCell style={styles.tableCell}>{profile.userName}</TableCell>
                      </TableRow>  
                    ))}
                </TableBody>
                    }
                </Table>
                }
        </Typography>
    )
}

export default Profiletable