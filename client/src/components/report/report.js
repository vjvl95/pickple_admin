
import React ,{useRef}from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
import { REPORT_LOADING_REQUEST,REPORT_SEARCH_REQUEST } from '../../actions/reportAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import { Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {Form,Input} from 'reactstrap'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import "./report.css"
import ReportTable from "./reporttable"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const Report = () => {
  const resetValue=useRef(null)

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
  const classes = useStyles();

  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);
  const {reports,totalElements} = useSelector((state) => state.report);
  const [reportResult, setReportResult] = React.useState('');
  const [reportState, setReportState] = React.useState('');
  const [form, setValues] = useState({keyword:""})

  useEffect(()=>{
    dispatch({
      
      type: REPORT_SEARCH_REQUEST,
      payload:{pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
      currentPage:currentPage
    })
    },[currentPage])
  
      const onChange= (e) => {
        setValues(
            {
                ...form,
                [e.target.name]:e.target.value
            }
        )
    }
    
    const handleChange_reportResult = (e) => {  
      setReportResult(e.target.value);
    };
    
    const handleChange_reportState = (e) => {  
      setReportState(e.target.value);
    
    };
    
    const onSubmit = async(e) => {
      await e.preventDefault()
      const {keyword} = form
      if(reportState ==="" && reportResult==="" )
      {
        dispatch({
          type: REPORT_SEARCH_REQUEST,
          payload:{keyword:keyword, pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage }},
          currentPage: currentPage
        })
      }
      else if(reportState ==="")
      {
        dispatch({
          type: REPORT_SEARCH_REQUEST,
          payload:{keyword:keyword, pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage },reportResult: reportResult},
          currentPage: currentPage
        })
      }
   
      else if(reportResult==="")
      {
        dispatch({
          type: REPORT_SEARCH_REQUEST,
          payload:{keyword:keyword, pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage }, reportState: reportState},
          currentPage: currentPage
        })
      }
      else{
        dispatch({
          type: REPORT_SEARCH_REQUEST,
          payload:{keyword:keyword, pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage }, reportResult: reportResult, reportState: reportState},
          currentPage: currentPage
        })

      }
  }
  
  return (
    <Paper className="report-paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
          
            <Grid item xs>
            <Fragment>
              <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
              <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"30%"}}/>
              <FormControl className={classes.formControl} >

            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reportState} onChange={handleChange_reportState} style={{width:"100px", marginLeft:"1.5rem"}}>
              <MenuItem value="BEFORE">처리 전</MenuItem>
              <MenuItem value="AFTER">처리 완료</MenuItem>
              <MenuItem value="">전체</MenuItem>

            </Select>
          </FormControl>
              
          <FormControl className={classes.formControl}>

          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reportResult} onChange={handleChange_reportResult } style={{width:"140px", marginLeft:"1.5rem"}}>
            <MenuItem value="BOARD_DELETED">게시글 삭제</MenuItem>
            <MenuItem value="BOARD_MODIFIED">게시글 수정</MenuItem>
            <MenuItem value="ACCOUNT_DELETED">작성자 삭제</MenuItem>
            <MenuItem value="GIVE_WARNING">작성자 경고</MenuItem>
            <MenuItem value="">전체</MenuItem>

          </Select>
          </FormControl>
                <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "50px", marginLeft:"20px" }} >
              검색
                </Button>      
      </div>
        </Fragment>  
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
       <ReportTable reports={reports}/>
      </div>
    </Paper>
  );
}

  
export default Report;