
import React ,{useRef}from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { PROFILE_SEARCH_REQUEST } from '../../actions/profileAction';
import Pagination from '../layout/Pagenation'
import Table from "../layout/table"
import Button from '@material-ui/core/Button';
import {Input} from 'reactstrap'
import Grid from '@material-ui/core/Grid';
import { Fragment } from 'react';


import "./profile.css"

const Profile = () => {
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);
  const resetValue=useRef(null)
  const [form, setValues] = useState({keyword:""})

    const dispatch = useDispatch();
    const {profiles,totalElements} = useSelector((state) => state.profile);
    console.log(totalElements)
    useEffect(()=>{
      dispatch({
        type: PROFILE_SEARCH_REQUEST,
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
  
  
    const onSubmit = async(e) => {
      await e.preventDefault()
      const {keyword} = form
      console.log(keyword)
        dispatch({
          type: PROFILE_SEARCH_REQUEST,
          payload:{keyword:keyword,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
          currentPage: currentPage
        })
  }



  return (
    <Paper className="profile-paper" style={{width:"45%", margin:"50px auto"}}>
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
          <Fragment>
    <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
            <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"30%"}}/>
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
        <Table profiles={profiles} tablenum={3}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} page={currentPage} />
    </Paper>
  );
}

export default Profile;