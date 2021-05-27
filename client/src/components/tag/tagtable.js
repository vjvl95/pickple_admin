import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import { TAG_LOADING_REQUEST,TAG_DELETE_REQUEST } from '../../actions/tagAction';
import {useDispatch, useSelector} from "react-redux"
import moment from 'moment';


const Tagtable = ({tags}) =>{
    const dispatch = useDispatch();
    const styles = {
        tableHead :{
          textAlign : 'center',
          fontWeight:"bold"

        },
        tableCell : {
            textAlign : 'center',
        },
    }

    

    const onDeleteClick = (id,name) => {
        var answer = window.confirm(name+"을 삭제하시겠습니까?");
        console.log(id)
        if (answer) {
          dispatch({
            type:TAG_DELETE_REQUEST,
            payload:id,
          })
        }     
      }
      
    return(
        <Typography color="textSecondary" align="center">
        {  tags.length===0 
        ?null
        :<Table>
        <TableHead >
            <TableCell style = {styles.tableHead}> 태그내용 </TableCell>
            <TableCell style = {styles.tableHead}> 추가일자</TableCell>
            <TableCell style = {styles.tableHead}> 태그삭제</TableCell>
        </TableHead>
        <TableBody >
            {tags.map((tag,index)=>(
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
        }
</Typography>
    )
}
export default (Tagtable);