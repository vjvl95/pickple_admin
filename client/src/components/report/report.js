
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { REPORT_LOADING_REQUEST } from '../../actions/reportAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"


const Report = () => {

  const styles = {
    tableHead :{
      textAlign : 'center',
    },
    tableCell : {
      textAlign : 'center',
      textOverflow: "ellipsis",
      whiteSpace:"nowrap",
      overflow:"hidden",
      maxWidth: "100px"    },
}

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);
  const {reports,totalElements} = useSelector((state) => state.report);

  useEffect(()=>{
    dispatch({
      type: REPORT_LOADING_REQUEST,
      payload: {params:{direction:"ASC", page:1, size:10}},
      currentPage:currentPage
    })
    },[currentPage])
  
    

      console.log(reports)
      console.log(totalElements)
  return (
    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
            </Grid>
            <Grid item xs>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Typography color="textSecondary" align="center">
                <Table>
                <TableHead>
                    <TableCell style = {styles.tableHead}> 신고 번호  </TableCell>
                    <TableCell style = {styles.tableHead}> 신고 내용 </TableCell>
                    <TableCell style = {styles.tableHead}> 신고 상태 </TableCell>
                    <TableCell style = {styles.tableHead}> 처리 결과</TableCell>

                </TableHead>
                {
                <TableBody>
                  {reports.map((report)=>(
              <TableRow  component={Link} to ={`/admin/report/${report.reportId}`}key={report.reportId}>
                <TableCell style={styles.tableCell}>{report.reportId}</TableCell>
                <TableCell style={styles.tableCell}>{report.reportText}</TableCell>
                <TableCell style={styles.tableCell}>{report.reportState}</TableCell>
                <TableCell style={styles.tableCell}>{report.reportResult}</TableCell>

              </TableRow>  
            )             
            )           
}
              
                </TableBody>
                }
                </Table>
        </Typography>
      </div>
    </Paper>
  );
}

export default Report;