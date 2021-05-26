
import React ,{useRef}from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { APPLY_LOADING_REQUEST, APPLY_DETAIL_REQUEST } from '../../actions/applyAction';
import { BOARD_DETAIL_REQUEST } from "../../actions/boardAction"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Modal from '@material-ui/core/Modal';
import { Link } from "react-router-dom"
import ApplyModal from "./applymodal"
import SelectInput from '@material-ui/core/Select/SelectInput';
import Pagination from '../layout/Pagenation'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Fragment } from 'react';
import {Form,Input} from 'reactstrap'
import Applytable from './applytable'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Apply = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setTagsPerPage] = useState(10);
  const [open, setOpen] = useState(false)
  const [applyId] = useState("")
  const { applys, totalElements } = useSelector((state) => state.apply);
  const { text, title, board } = useSelector((state) => state.board);
  const indexOfLastTag = currentPage * postsPerPage
  const indexOfFirstTag = indexOfLastTag - postsPerPage
  const [isContracted, setisContracted] = React.useState('');
  const [reviewStatetype, setreviewStatetype] = React.useState('');

  const [form, setValues] = useState({keyword:""})
  const classes = useStyles();
  const resetValue=useRef(null)


  const onChange= (e) => {
    setValues(
        {
            ...form,
            [e.target.name]:e.target.value
        }
    )
}

const handleChange = (e) => {  
  setisContracted(e.target.value);
};

const handleChange_reviewState = (e) => {  
  setreviewStatetype(e.target.value);

};

  const styles = {
    tableHead: {
      textAlign: 'center',
    },
    tableCell: {
      textAlign: 'center',
      height: "60px"
    },
  }

  const onSubmit = async(e) => {
    await e.preventDefault()
    const {keyword} = form
    
    if(reviewStatetype===""&&isContracted==="")
    {
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{keyword:keyword ,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
        currentPage: currentPage
      })
    }
    else if(reviewStatetype==="")
    {
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{isContracted:isContracted,keyword:keyword ,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
        currentPage: currentPage
      })
    }
    else if(isContracted==="")
    {
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{keyword:keyword ,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}, reviewState:reviewStatetype},
        currentPage: currentPage
      })
    }
    else{
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{isContracted:isContracted,keyword:keyword ,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}, reviewState:reviewStatetype},
        currentPage: currentPage
      })
    }
}


  useEffect(() => {
    dispatch({
      type: APPLY_LOADING_REQUEST,
      payload:{pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
      currentPage: currentPage
    })
  }, [currentPage])


  console.log(totalElements)
  return (
    <div>
      <Paper className="apply-paper">
        <AppBar className="searchBar" position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
              <Fragment>
              <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
              <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"30%"}}/>
              <FormControl className={classes.formControl} >

            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={isContracted} onChange={handleChange} style={{width:"100px", marginLeft:"1.5rem"}}>
              <MenuItem value="0">계약 전</MenuItem>
              <MenuItem value="1">계약 완료</MenuItem>
              <MenuItem value="">공백</MenuItem>

            </Select>
          </FormControl>
              
          <FormControl className={classes.formControl} >

          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reviewStatetype} onChange={handleChange_reviewState} style={{width:"140px", marginLeft:"1.5rem"}}>
            <MenuItem value="BEFORE">리뷰 작성 전</MenuItem>
            <MenuItem value="WAITING">리뷰 승인 대기</MenuItem>
            <MenuItem value="ACCEPT">리뷰 승인</MenuItem>
            <MenuItem value="REJECT">리뷰 반려</MenuItem>
            <MenuItem value="">공백</MenuItem>
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
          <Applytable applys={applys}/>
        </div>
        <Pagination postsPerPage={postsPerPage} totalPosts={totalElements} paginate={setCurrentPage} />

      </Paper>

    </div>


  );
}

export default Apply;