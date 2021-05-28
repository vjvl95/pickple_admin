
import React ,{useRef}from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '../layout/table';
import { REPORT_SEARCH_REQUEST } from '../../actions/reportAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {Input} from 'reactstrap'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import "./report.css"
import InputLabel from '@material-ui/core/InputLabel';
import Pagination from '../layout/Pagenation'

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
  const [reportResult, setReportResult] = React.useState('ALL');
  const [reportState, setReportState] = React.useState('ALL');
  const [form, setValues] = useState({keyword:""})

  useEffect(()=>{
     
     onSubmit()
      
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
      const {keyword} = form
      if(reportState ==="ALL" && reportResult==="ALL" )
      {
        dispatch({
          type: REPORT_SEARCH_REQUEST,
          payload:{keyword:keyword, pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage }},
          currentPage: currentPage
        })
      }
      else if(reportState ==="ALL")
      {
        dispatch({
          type: REPORT_SEARCH_REQUEST,
          payload:{keyword:keyword, pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage },reportResult: reportResult},
          currentPage: currentPage
        })
      }
   
      else if(reportResult==="ALL")
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
        <Toolbar  style={{paddingTop:"15px"}}>
          <Grid container spacing={2} alignItems="center">
          
            <Grid item xs>
            <Fragment>
              <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
              <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"30%"}}/>
              <FormControl className={classes.formControl} style={{bottom:"15px"}}>
              <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>처리 상태</InputLabel>

            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reportState} onChange={handleChange_reportState} style={{width:"100px", marginLeft:"1.5rem"}}>
              <MenuItem value="BEFORE">처리 전</MenuItem>
              <MenuItem value="AFTER">처리 완료</MenuItem>
              <MenuItem value="ALL">전체</MenuItem>

            </Select>
          </FormControl>
              
          <FormControl className={classes.formControl} style={{bottom:"15px"}}>
          <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>처리 결과</InputLabel>

          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reportResult} onChange={handleChange_reportResult } style={{width:"140px", marginLeft:"1.5rem"}}>
            <MenuItem value="BOARD_DELETED">게시글 삭제</MenuItem>
            <MenuItem value="BOARD_MODIFIED">게시글 수정</MenuItem>
            <MenuItem value="ACCOUNT_DELETED">작성자 삭제</MenuItem>
            <MenuItem value="GIVE_WARNING">작성자 경고</MenuItem>
            <MenuItem value="ALL">전체</MenuItem>

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
       <Table reports={reports} tablenum={4}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage}  page={currentPage}/>

    </Paper>
  );
}

  
export default Report;