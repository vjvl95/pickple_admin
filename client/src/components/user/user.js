import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React , {useRef} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {Form,Input} from 'reactstrap'

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
import { USER_LOADING_REQUEST,USER_SEARCH_REQUEST} from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Usertable from "./usertable"
import UserSearch from "./userSearch"
import { Fragment } from 'react';
import Pagination from '../layout/Pagenation'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const User = () => {

  
  const dispatch=useDispatch()
  const [form, setValues] = useState({keyword:""})
  const [type, setType] = React.useState('');
  const classes = useStyles();

  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);
  const {users,totalElements} = useSelector((state) => state.user);
  useEffect(()=>{
    dispatch({
      type: USER_LOADING_REQUEST,
      payload:{params:{direction:"ASC", page:currentPage, size:postsPerPage}}
    })
    },[currentPage])

  const indexOfLastTag=currentPage*postsPerPage
  const indexOfFirstTag=indexOfLastTag-postsPerPage
  const currentTags=users.slice(indexOfFirstTag,indexOfLastTag)

  const onChange= (e) => {
    setValues(
        {
            ...form,
            [e.target.name]:e.target.value
        }
    )
}


const handleChange = (e) => {  
  setType(e.target.value);
};

const onSubmit = async(e) => {
    await e.preventDefault()
    const {keyword} = form
    console.log(type)
    if(type!=="ALL"){
      dispatch({
        type:USER_SEARCH_REQUEST,
        payload:{params:{keyword:keyword, "pageRequest.direction" : "ASC", "pageRequest.page" : 1, "pageRequest.size":10,type:type}  }
    })
    }
    else{
      dispatch({
      type:USER_SEARCH_REQUEST,
      payload:{params:{keyword:keyword, "pageRequest.direction" : "ASC", "pageRequest.page" : 1, "pageRequest.size":10}  }
  })
}
}

const resetValue=useRef(null)



   
  return (
    <Fragment>
    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar>
        <Grid container spacing={2} alignItems="center">
      <Grid item xs>     
            <Fragment>
        <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
                <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"30%"}}/>
                <FormControl className={classes.formControl} >

            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={handleChange} style={{width:"100px", marginLeft:"1.5rem"}}>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="MEMBER">MEMBER</MenuItem>
              <MenuItem value="ALL">ALL</MenuItem>
            </Select>
          </FormControl>
              

                <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "50px", marginLeft:"20px" }} >
              검색
                </Button>      
      </div>
        </Fragment>  
            </Grid>
          </Grid>        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Usertable users={users}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} />

    </Paper>
    </Fragment>
  );
}


export default (User);