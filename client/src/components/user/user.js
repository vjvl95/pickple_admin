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
import { USER_SEARCH_REQUEST} from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import UserSearch from "./userSearch"
import { Fragment } from 'react';
import Pagination from '../layout/Pagenation'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Table from "../layout/table"
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
  const [type, setType] = React.useState('ALL');
  const classes = useStyles();

  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);
  const {users,totalElements} = useSelector((state) => state.user);
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


console.log(totalElements)
const handleChange = (e) => {  
  setType(e.target.value);
};

const onSubmit = async(e) => {
    const {keyword} = form
    console.log(type)
    if(type!=="ALL"){
      dispatch({
        type:USER_SEARCH_REQUEST,
        payload:{accountType:type , keyword:keyword,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
    })
    }
    else{
      dispatch({
      type:USER_SEARCH_REQUEST,
      payload:{keyword:keyword,pageRequest:{direction:"ASC", page:currentPage, size:postsPerPage}},
    })
}
}

const resetValue=useRef(null)



   
  return (
    <Fragment>
    <Paper className="user-paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar  style={{paddingTop:"15px"}}>
        <Grid container spacing={2} alignItems="center">
      <Grid item xs>     
            <Fragment>
        <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
                <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"30%"}}/>
                <FormControl className={classes.formControl} style={{bottom:"15px"}}>
                <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>멤버 타입</InputLabel>

            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={handleChange} style={{width:"100px", marginLeft:"1.5rem"}}>
              <MenuItem value="ADMIN">관리자</MenuItem>
              <MenuItem value="MEMBER">멤버</MenuItem>
              <MenuItem value="ALL">전체</MenuItem>
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
        <Table users={users} tablenum={6}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} />

    </Paper>
    </Fragment>
  );
}


export default (User);