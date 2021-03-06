
import React ,{useRef}from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
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
import Button from '@material-ui/core/Button';

const Board = () => {
  const resetValue=useRef(null)

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage]=useState(1)
  const {boards,totalElements} = useSelector((state) => state.board);
  const [form, setValues] = useState({keyword:""})
  const [direction, setDirection]=useState("DESC")

  useEffect(()=>{
    const {keyword} = form

    dispatch({
      type: BOARD_SEARCH_REQUEST,
      payload:{keyword:keyword,pageRequest:{direction:direction, page:currentPage, size:10}},
      currentPage: currentPage,
    })
    },[currentPage,direction,dispatch])
   

    const onChange= (e) => {
      setValues(
          {
              ...form,
              [e.target.name]:e.target.value
          }
      )
      setCurrentPage(1)
  }

const handleChange = (event) => {
  setDirection(event.target.value)
  setCurrentPage(1)
};

const onSubmit = async(e) => {

  const {keyword} = form
  setCurrentPage(1)
  dispatch({
  type: BOARD_SEARCH_REQUEST,
  payload:{keyword:keyword,pageRequest:{direction:direction, page:currentPage, size:10}},
  currentPage:currentPage
  })
}
  return (
    <Paper className="board-paper">
      <AppBar className="searchBar" position="static" color="default" elevation={0}>
        <Toolbar style={{paddingTop:"10px", paddingBottom: "10px",justifyContent:"center"}}>
        
    <FormControl component="fieldset">
          <RadioGroup aria-label="gender" name="gender1" value={direction} onChange={(e)=>handleChange(e)} style={{flexDirection:"unset"}}>
                <FormControlLabel value="DESC"  control={<Radio  size="small"color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }} />} label="?????????" />
                <FormControlLabel value="ASC" control={<Radio  size="small" color="default" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }}  />} label="?????????" />
           </RadioGroup>
    </FormControl>

      <Fragment>      
           <div className="search-bar" style={{height:"50px",display:"flex" , justifyContent:"center", margin:"10px"}}>
           <div style={{display:"flex", flexDirection:"column"}}>
            <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{marginLeft:"10px", marginTop:"5px", width:"100%"}}/>
            <span style={{marginTop:"5px", marginLeft:"10px",fontSize:"11px",color:"darkgray"}}>????????????:??????,??????</span>
            </div>
            <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{height: "38px", marginLeft:"40px", marginTop:"5px" }} >
              ??????
            </Button> 
           </div>
      </Fragment>  
         
        </Toolbar>
      </AppBar>
      <div className="contentWrapper">
      <Table boards={boards} tablenum={2}/>
      </div>
      <Pagination postsPerPage={10} totalPosts = {totalElements} paginate={setCurrentPage}  page={currentPage}/>

    </Paper>
  );
}

export default Board;