
import React ,{useRef}from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { APPLY_LOADING_REQUEST, APPLY_SEARCH_REQUEST } from '../../actions/applyAction';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Pagination from '../layout/Pagenation'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Fragment } from 'react';
import Table from "../layout/table"
import {Input} from 'reactstrap'
import InputLabel from '@material-ui/core/InputLabel';
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

const Apply = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10);
  const { applys, totalElements,pre_page} = useSelector((state) => state.apply);
  const [isContracted, setisContracted] = React.useState('ALL');
  const [reviewStatetype, setreviewStatetype] = React.useState('ALL');
  const [direction,setDirection]=useState("DESC")
  const [form, setValues] = useState({keyword:""})
  const classes = useStyles();
  const resetValue=useRef(null)
  
  
  useEffect(() => {

    onSubmit()
    
    
}, [dispatch,currentPage,direction,isContracted,reviewStatetype])

const onSubmit = async(e) => {

  const {keyword} = form

 
  if(pre_page!==currentPage)
  {

  }
  else
  {
    setCurrentPage(1)
  }
 
  if(reviewStatetype==="ALL"&&isContracted==="ALL")
    {
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{keyword:keyword,pageRequest:{direction:direction, page:currentPage, size:10}},
        reviewStatetype:reviewStatetype,
        isContracted:isContracted,
        currentPage:currentPage
      })
    }
    else if(reviewStatetype==="ALL")
    {
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{keyword:keyword,isContracted:isContracted,pageRequest:{direction:direction, page:currentPage, size:10}},
        reviewStatetype:reviewStatetype,
        isContracted:isContracted,
        currentPage:currentPage

      })
    }
    else if(isContracted==="ALL")
    {
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{keyword:keyword,pageRequest:{direction:direction, page:currentPage, size:10}, reviewState:reviewStatetype},
        reviewStatetype:reviewStatetype,
        isContracted:isContracted,       
        currentPage:currentPage
      })
    }
    else{
      dispatch({
        type: APPLY_LOADING_REQUEST,
        payload:{keyword:keyword,isContracted:isContracted,pageRequest:{direction:direction, page:currentPage, size:10}, reviewState:reviewStatetype},
        reviewStatetype:reviewStatetype,
        isContracted:isContracted,
        currentPage:currentPage
      })
    }   

}
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
  setCurrentPage(1)

};

const handleChange_reviewState = (e) => {  
  setreviewStatetype(e.target.value);
  setCurrentPage(1)

};

const handleChange_direction = (event) => {
  setDirection(event.target.value);
  setCurrentPage(1)
};




  return (
    <div>
      <Paper className="apply-paper">
        <AppBar className="searchBar" position="static" color="default" elevation={0}>
          <Toolbar style={{paddingTop:"15px", justifyContent:"center"}}>
            
          <FormControl component="fieldset" >
          <RadioGroup aria-label="gender" name="gender1" value={direction} onChange={handleChange_direction} style={{flexDirection:"unset",flexWrap:"unset"}}>
                <FormControlLabel value="DESC" style={{whiteSpace:"nowrap"}} control={<Radio  size="small"color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }} />} label="?????????" />
                <FormControlLabel value="ASC" style={{whiteSpace:"nowrap"}} control={<Radio  size="small" color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }}  />} label="?????????" />
           </RadioGroup>
    </FormControl>


              <Fragment>
             
             

              <FormControl className={classes.formControl} style={{bottom:"15px"}} >
              <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>?????? ??????</InputLabel>

              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={isContracted} onChange={handleChange} style={{width:"100px", marginLeft:"1.5rem"}}>
              <MenuItem value="0">?????? ???</MenuItem>
              <MenuItem value="1">?????? ??????</MenuItem>
              <MenuItem value="ALL">??????</MenuItem>

            </Select>
          </FormControl>
              
          <FormControl className={classes.formControl}  style={{bottom:"15px"}}>
          <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>?????? ??????</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={reviewStatetype} onChange={handleChange_reviewState} style={{width:"140px", marginLeft:"1.5rem"}}>
            <MenuItem value="BEFORE">?????? ?????? ???</MenuItem>
            <MenuItem value="WAITING">?????? ?????? ??????</MenuItem>
            <MenuItem value="ACCEPT">?????? ??????</MenuItem>
            <MenuItem value="REJECT">?????? ??????</MenuItem>
            <MenuItem value="ALL">??????</MenuItem>
          </Select>
          </FormControl>
          <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
              <div style={{display:"flex", flexDirection:"column"}}>

           <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"100%"}}/>
              <span style={{marginTop:"5px", marginLeft:"10px",fontSize:"11px",color:"darkgray"}}>????????????:????????????, ????????? ?????????</span>
              </div>
          <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "38px", marginLeft:"20px", marginTop:"5px" }} >
              ??????
            </Button>  
      </div>
        </Fragment>  
     
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