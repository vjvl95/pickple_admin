
import React ,{useRef}from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { BOARD_SEARCH_REQUEST } from '../../actions/boardAction';
import Pagination from '../layout/Pagenation'
import { Fragment } from 'react';
import {Input} from 'reactstrap'
import Table from "../layout/table"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const Board = () => {
  const resetValue=useRef(null)

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage]=useState(10);
  const {boards,totalElements} = useSelector((state) => state.board);
  const [form, setValues] = useState({keyword:""})
  const [direction, setDirection]=useState("ASC")
  useEffect(()=>{
    dispatch({
      type: BOARD_SEARCH_REQUEST,
      payload:{pageRequest:{direction:direction, page:currentPage, size:postsPerPage}},
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
  
      dispatch({
        type: BOARD_SEARCH_REQUEST,
        payload:{keyword:keyword,pageRequest:{direction:direction, page:currentPage, size:postsPerPage}},
        currentPage: currentPage
      })
}
const handleChange = (event) => {
  setDirection(event.target.value);
  console.log(direction)
};
  return (
    <Paper className="board-paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar style={{paddingTop:"10px", paddingBottom: "10px",justifyContent:"center"}}>
        
    <FormControl component="fieldset">
       <FormLabel component="legend" style={{fontWeight:"bold", marginLeft:"35%",color: "rgba(0, 0, 0, 0.54)"}}>정렬</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={direction} onChange={handleChange} style={{flexDirection:"unset"}}>
                <FormControlLabel value="ASC" control={<Radio  size="small"color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }} />} label="등록순" />
                <FormControlLabel value="DESC" control={<Radio  size="small" color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }}  />} label="최신순" />
           </RadioGroup>
    </FormControl>

      <Fragment>      
           <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
            <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"100%"}}/>
            <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "50px", marginLeft:"40px" }} >
            검색
            </Button>      
           </div>
      </Fragment>  
         
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
      <Table boards={boards} tablenum={2}/>
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts = {totalElements} paginate={setCurrentPage}  page={currentPage}/>

    </Paper>
  );
}

export default Board;