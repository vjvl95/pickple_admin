
import React ,{useRef}from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { APPLY_LOADING_REQUEST, APPLY_DETAIL_REQUEST } from '../../actions/applyAction';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Pagination from '../layout/Pagenation'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Fragment } from 'react';
import Table from "../layout/table"
import {Input} from 'reactstrap'
import InputLabel from '@material-ui/core/InputLabel';

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
  const { applys, totalElements,loading,pre_reviewStatetype,pre_isContracted,pre_keyword} = useSelector((state) => state.apply);
  const indexOfLastTag = currentPage * postsPerPage
  const indexOfFirstTag = indexOfLastTag - postsPerPage
  const [isContracted, setisContracted] = React.useState('ALL');
  const [reviewStatetype, setreviewStatetype] = React.useState('ALL');

  const [form, setValues] = useState({keyword:""})
  const classes = useStyles();
  const resetValue=useRef(null)
  const {keyword} = form
  useEffect(() => {
    
    onSubmit()
    
}, [currentPage])

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



  console.log(reviewStatetype)
  console.log(isContracted)


  const onSubmit = async(e) => {
    const {keyword} = form
    console.log(pre_reviewStatetype)
    console.log(pre_isContracted)
    console.log(pre_keyword)
    if(pre_reviewStatetype!== reviewStatetype || pre_isContracted!== isContracted  )
    {
      setCurrentPage(1)
    }

    if(reviewStatetype==="ALL"&&isContracted==="ALL")
    {
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{keyword:keyword ,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
        reviewStatetype:reviewStatetype,
        isContracted:isContracted,
        keyword:keyword
      })
    }
    else if(reviewStatetype==="ALL")
    {
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{isContracted:isContracted,keyword:keyword ,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
        reviewStatetype:reviewStatetype,
        isContracted:isContracted
      })
    }
    else if(isContracted==="ALL")
    {
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{keyword:keyword ,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}, reviewState:reviewStatetype},
        reviewStatetype:reviewStatetype,
        isContracted:isContracted
      })
    }
    else{
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{isContracted:isContracted,keyword:keyword ,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}, reviewState:reviewStatetype},
        reviewStatetype:reviewStatetype,
        isContracted:isContracted
      })
    }
}



  console.log(applys)
  console.log(totalElements)
  console.log(loading)
  return (
    <div>
      <Paper className="apply-paper">
        <AppBar className="searchBar" position="static" color="default" elevation={0}>
          <Toolbar style={{paddingTop:"15px"}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
              <Fragment>
              <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
              <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"30%"}}/>
              <FormControl className={classes.formControl} style={{bottom:"15px"}} >
              <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>계약 여부</InputLabel>

              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={isContracted} onChange={handleChange} style={{width:"100px", marginLeft:"1.5rem"}}>
              <MenuItem value="0">계약 전</MenuItem>
              <MenuItem value="1">계약 완료</MenuItem>
              <MenuItem value="ALL">전체</MenuItem>

            </Select>
          </FormControl>
              
          <FormControl className={classes.formControl}  style={{bottom:"15px"}}>
          <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>리뷰 상태</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reviewStatetype} onChange={handleChange_reviewState} style={{width:"140px", marginLeft:"1.5rem"}}>
            <MenuItem value="BEFORE">리뷰 작성 전</MenuItem>
            <MenuItem value="WAITING">리뷰 승인 대기</MenuItem>
            <MenuItem value="ACCEPT">리뷰 승인</MenuItem>
            <MenuItem value="REJECT">리뷰 반려</MenuItem>
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

      <Table applys={applys} tablenum={1}/>
        </div>
        <Pagination postsPerPage={postsPerPage} totalPosts={totalElements} paginate={setCurrentPage} page={currentPage}/>

      </Paper>

    </div>


  );
}

export default Apply;