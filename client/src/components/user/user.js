import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React , {useRef} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {Input} from 'reactstrap'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { USER_SEARCH_REQUEST} from '../../actions/userAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Fragment } from 'react';
import Pagination from '../layout/Pagenation'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Table from "../layout/table"
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

const User = () => {

  
  const dispatch=useDispatch()
  const [form, setValues] = useState({keyword:""})
  const [type, setType] = React.useState('ALL');
  const classes = useStyles();

  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage]=useState(10);
  const {users,totalElements,pre_page} = useSelector((state) => state.user);
  useEffect(()=>{
    
    onSubmit()
    
  
    },[dispatch,currentPage,type])

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
  setCurrentPage(1)
};




const resetValue=useRef(null)

const onSubmit = async(e) => {

  const {keyword} = form

  if(pre_page!==currentPage)
  {

  }
  else
  {
    setCurrentPage(1)
  }

  if(type!=="ALL"){
    dispatch({
      type:USER_SEARCH_REQUEST,
      payload:{accountType:type , keyword:keyword,pageRequest:{direction:"ASC", page:currentPage, size:10}},
      currentPage:currentPage,
      accounttype:type
  })
  }
  else{
    dispatch({ 
    type:USER_SEARCH_REQUEST,
    payload:{keyword:keyword,pageRequest:{direction:"ASC", page:currentPage, size:10}},
    currentPage:currentPage,
    accounttype:type

  })
}
}

   
  return (
    <Fragment>
    <Paper className="user-paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar  style={{paddingTop:"15px"}}>
        <Grid container spacing={2} alignItems="center">
      <Grid item xs>     
            <Fragment>
        <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
               
                <FormControl className={classes.formControl} style={{bottom:"15px"}}>
                <InputLabel id="demo-simple-select-label" style={{left:"30px"}}>멤버 타입</InputLabel>

            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={handleChange} style={{width:"100px", marginLeft:"1.5rem"}}>
              <MenuItem value="ADMIN">관리자</MenuItem>
              <MenuItem value="MEMBER">멤버</MenuItem>
              <MenuItem value="ALL">전체</MenuItem>
            </Select>
          </FormControl>
          <div style={{display:"flex", flexDirection:"column"}}>
                <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"85%"}}/>
                <span style={{marginTop:"5px", marginLeft:"10px",fontSize:"11px",color:"darkgray"}}>검색기준: 이름,사용자ID</span>
                 </div>
          <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "38px", marginTop:"5px" }} >
              검색
            </Button> 
                 
                
      </div>
        </Fragment>  
            </Grid>
          </Grid>        
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
        <Table users={users} tablenum={6}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} page={currentPage} />

    </Paper>
    </Fragment>
  );
}


export default (User);