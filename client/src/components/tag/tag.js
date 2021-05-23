import './tag.css';
import React ,{useRef} from 'react';
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
import { TAG_LOADING_REQUEST,TAG_DELETE_REQUEST ,TAG_SEARCH_REQUEST} from '../../actions/tagAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { hot } from 'react-hot-loader'
import Pagination from '../layout/Pagenation'
import Tagadd from "./tagadd"
import { Fragment } from 'react';
import { StylesProvider} from '@material-ui/styles';
import Tagsearch from "./tagsearch"
import Tagtable from "./tagtable"
import {Form,Input} from 'reactstrap'




const Tag = () => {
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setTagsPerPage]=useState(10);
  const [form, setValues] = useState({keyword:""})

  const {tags,totalElements} = useSelector((state) => state.tag);

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch({
      type: TAG_LOADING_REQUEST,
      payload:{params:{direction:"ASC", page:currentPage, size:postsPerPage}},
      currentPage:currentPage
    })
    },[currentPage])

    const onReset = () =>
    {
        resetValue.current.value=""
        dispatch({
          type: TAG_LOADING_REQUEST,
          payload:{params:{direction:"ASC", page:currentPage, size:postsPerPage}},
          currentPage:currentPage
        })
    }

    const onSubmit = async(e) => {
      await e.preventDefault()
      const {keyword} = form
      console.log(keyword)
      if(keyword)
      { 
      dispatch({
          type:TAG_SEARCH_REQUEST,
          payload:keyword
      })
      }
      
      else{
          alert("검색어를 입력하십시요.")
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

    const resetValue=useRef(null)
  return (

    <Fragment>
    <Tagadd/>

    <Paper className="paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs>     
            <Fragment>
            <div className="searchdiv">
            <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginBottom:"5px",width: "35%",  marginLeft: "7rem"}}/>
            <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{    marginLeft: "6rem"}} >
          검색
            </Button>

            <Button className="reset" variant="contained" onClick={onReset} style={{    marginLeft: "2rem"}}>
          초기화
            </Button>
            </div>
        </Fragment>  
            </Grid>
          </Grid>


      </AppBar>
      <div className="contentWrapper">
      <Tagtable tags={tags}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} />
    </Paper>
    </Fragment>
  );
}

export default (Tag);