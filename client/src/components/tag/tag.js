import './tag.css';
import React ,{useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { TAG_SEARCH_REQUEST,TAG_UPLOADING_REQUEST} from '../../actions/tagAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Pagination from '../layout/Pagenation'
import { Fragment } from 'react';
import Table from "../layout/table"
import {Input} from 'reactstrap'




const Tag = () => {
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage]=useState(10);
  const [form, setValues] = useState({keyword:""})

  const {tags,totalElements} = useSelector((state) => state.tag);

  const dispatch = useDispatch();
    useEffect(()=>{
    const {keyword} = form

    dispatch({
      type: TAG_SEARCH_REQUEST,
      payload:{keyword:keyword,pageRequest:{direction:"ASC", page:currentPage, size:10}},
      currentPage:currentPage
    })
    },[dispatch,currentPage,form.keyword,form])

  const onChange= (e) => {
    setValues(
        {
            ...form,
            [e.target.name]:e.target.value
        }
    )
    setCurrentPage(1)
}
const onuploadClick = () => {

  const {keyword} = form

  var answer = window.confirm(keyword+"을 추가하시겠습니까?");
  if(keyword){

  if (answer) {
    dispatch({
      type:TAG_UPLOADING_REQUEST,
      payload:{tagName:keyword},
    },[])
    }
    
  }
  else{
    alert("검색어를 입력하십시요.")

  }  

}

    const resetValue=useRef(null)
  return (

    <Fragment>

    <Paper className="tag-paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs>     
            <Fragment>
            <div className="searchdiv">
            <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginBottom:"5px" , marginTop:"10px",width: "35%",  marginLeft: "4rem"}}/>
            <div className="buttondiv" style={{marginTop:"10px"}}>

            <Button className="tag_button" variant="contained" color="primary" onClick={onuploadClick}  style={{marginLeft:"10px",marginRight:"10px"}}  >
            등록
            </Button>
          
            </div>
            </div>
        </Fragment>  
            </Grid>
          </Grid>


      </AppBar>
      <div className="contentWrapper">
      <Table tags={tags} tablenum={5}/>

      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage} page={currentPage} />
    </Paper>
    </Fragment>
  );
}

export default (Tag);