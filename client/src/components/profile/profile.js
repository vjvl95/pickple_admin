
import React ,{useRef}from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { PROFILE_SEARCH_REQUEST } from '../../actions/profileAction';
import Pagination from '../layout/Pagenation'
import Table from "../layout/table"
import Button from '@material-ui/core/Button';
import {Input} from 'reactstrap'
import { Fragment } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import "./profile.css"

const Profile = () => {
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage]=useState(10);
  const resetValue=useRef(null)
  const [form, setValues] = useState({keyword:""})
  const [direction,setDirection]=useState("DESC")
    const dispatch = useDispatch();
    const {profiles,totalElements} = useSelector((state) => state.profile);
    console.log(totalElements)
    useEffect(()=>{
      dispatch({
        type: PROFILE_SEARCH_REQUEST,
        payload:{pageRequest:{direction:direction, page:currentPage, size:postsPerPage}},
        currentPage:currentPage
      })
      },[currentPage,direction])
   
      const onChange= (e) => {
        setValues(
            {
                ...form,
                [e.target.name]:e.target.value
            }
        )
    }
  
  
    const onSubmit = async(e) => {
      const {keyword} = form
      console.log(keyword)
        dispatch({
          type: PROFILE_SEARCH_REQUEST,
          payload:{keyword:keyword,pageRequest:{direction:direction, page:currentPage, size:postsPerPage}},
          currentPage: currentPage
        })
  }


  const handleChange = (event) => {
    setDirection(event.target.value);
    setCurrentPage(1)
  };

  return (
    <Paper className="profile-paper" style={{minWidth:"550px", width:"50%", margin:"50px auto"}}>
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar style={{paddingTop:"10px", paddingBottom: "10px",justifyContent:"center"}}>
        <FormControl component="fieldset">
          <RadioGroup aria-label="gender" name="gender1" value={direction} onChange={handleChange} style={{flexDirection:"unset"}}>
                <FormControlLabel value="ASC" control={<Radio  size="small"color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }} />} label="등록순" />
                <FormControlLabel value="DESC" control={<Radio  size="small" color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }}  />} label="최신순" />
           </RadioGroup>
    </FormControl>

          <Fragment>
    <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
            <div style={{display:"flex", flexDirection:"column"}}>
            <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"100%"}}/>
            <span style={{marginTop:"5px", marginLeft:"10px",fontSize:"11px",color:"darkgray"}}>검색기준:아이디,카카오ID,사용자이름</span>
            </div>
            <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "38px", marginLeft:"20px", marginTop:"5px" }} >
            검색
            </Button>      
    </div>
      </Fragment>  
         
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Table profiles={profiles} tablenum={3}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} page={currentPage} />
    </Paper>
  );
}

export default Profile;