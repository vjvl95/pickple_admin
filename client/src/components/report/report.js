
import React ,{useRef}from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Table from '../layout/table';
import { REPORT_SEARCH_REQUEST } from '../../actions/reportAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {Input} from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles';
import "./report.css"
import InputLabel from '@material-ui/core/InputLabel';
import Pagination from '../layout/Pagenation'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

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

  const dispatch = useDispatch();
  const classes = useStyles();

  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage]=useState(10);
  const {reports,totalElements,pre_page} = useSelector((state) => state.report);

  const [reportResult, setReportResult] = React.useState('ALL');
  const [reportState, setReportState] = React.useState('ALL');
  const [form, setValues] = useState({keyword:""})
  const [direction,setDirection]=useState("DESC")

  useEffect(()=>{
    onSubmit()    
    },[dispatch,currentPage,direction,reportResult,reportState])
  
      const onChange= (e) => {
        setValues(
            {
                ...form,
                [e.target.name]:e.target.value
            }
        )
        setCurrentPage(1)
    }
    
    const handleChange_reportResult = (e) => {  
      setReportResult(e.target.value);
      setCurrentPage(1)

    };
    
    const handleChange_reportState = (e) => {  
      setReportState(e.target.value);
      setCurrentPage(1)
    };
    const onSubmit = async(e) => {

      const {keyword} = form
      if(pre_page!==currentPage)
      {

      }
      else
      {
        setCurrentPage(1)
      }
      if(reportState ==="ALL" && reportResult==="ALL" )
    {
      dispatch({
        type: REPORT_SEARCH_REQUEST,
        payload:{keyword:keyword, pageRequest:{direction:direction, page:currentPage, size:10 }},
        currentPage: currentPage
      })
    }
    else if(reportState ==="ALL")
    {
      dispatch({
        type: REPORT_SEARCH_REQUEST,
        payload:{keyword:keyword, pageRequest:{direction:direction, page:currentPage, size:10 },reportResult: reportResult},
        currentPage: currentPage
      })
    }
 
    else if(reportResult==="ALL")
    {
      dispatch({
        type: REPORT_SEARCH_REQUEST,
        payload:{keyword:keyword, pageRequest:{direction:direction, page:currentPage, size:10 }, reportState: reportState},
        currentPage: currentPage
      })
    }
    else{
      dispatch({
        type: REPORT_SEARCH_REQUEST,
        payload:{keyword:keyword, pageRequest:{direction:direction, page:currentPage, size:10 }, reportResult: reportResult, reportState: reportState},
        currentPage: currentPage
      })
    }      
    }
    
  const handleChange = (event) => {
    setDirection(event.target.value);
    setCurrentPage(1)
  };
  return (
    <Paper className="report-paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0} style={{justifyContent:"center"}}>
        <Toolbar  style={{paddingTop:"15px", justifyContent:"center"}}>
        

        <FormControl component="fieldset">
          <RadioGroup aria-label="gender" name="gender1" value={direction} onChange={handleChange} style={{flexDirection:"unset", flexWrap:"unset"}}>
                <FormControlLabel value="DESC" style={{whiteSpace:"nowrap"}} control={<Radio  size="small"color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }} />} label="?????????" />
                <FormControlLabel value="ASC"  style={{whiteSpace:"nowrap"}} control={<Radio  size="small" color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }}  />} label="?????????" />
           </RadioGroup>
    </FormControl>


            <Fragment>
              <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
             
              <FormControl className={classes.formControl} style={{bottom:"15px"}}>
              <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>?????? ??????</InputLabel>

            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reportState} onChange={handleChange_reportState} style={{width:"100px", marginLeft:"1.5rem"}}>
              <MenuItem value="BEFORE">?????? ???</MenuItem>
              <MenuItem value="AFTER">?????? ??????</MenuItem>
              <MenuItem value="ALL">??????</MenuItem>

            </Select>
          </FormControl>
              
          <FormControl className={classes.formControl} style={{bottom:"15px"}}>
          <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>?????? ??????</InputLabel>

          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reportResult} onChange={handleChange_reportResult } style={{width:"140px", marginLeft:"1.5rem"}}>
            <MenuItem value="BOARD_DELETED">????????? ??????</MenuItem>
            <MenuItem value="BOARD_MODIFIED">????????? ??????</MenuItem>
            <MenuItem value="ACCOUNT_DELETED">????????? ??????</MenuItem>
            <MenuItem value="GIVE_WARNING">????????? ??????</MenuItem>
            <MenuItem value="NO_PROBLEM">????????????</MenuItem>
            <MenuItem value="ALL">??????</MenuItem>

          </Select>
          </FormControl>
          <div style={{display:"flex", flexDirection:"column"}}>
              <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"100%"}}/>
              <span style={{marginTop:"5px", marginLeft:"10px",fontSize:"11px",color:"darkgray"}}>????????????: ??????,?????????ID</span>
            </div>
          <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "38px", marginLeft:"20px", marginTop:"5px" }} >
              ??????
            </Button> 
                 
      </div>
        </Fragment>  
  
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