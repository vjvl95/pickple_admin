import React, {Fragment, useState,useRef} from 'react'
import {Form,Input} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux'
import { TAG_SEARCH_REQUEST } from '../../actions/tagAction';
import { useParams } from 'react-router';
import "./tag.css"
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Tagtable from './tagtable'
const SearchInput = () => {
    const dispatch=useDispatch()
    const [form, setValues] = useState({keyword:""})
    const {searchResult} = useSelector((state)=>state.tag)
   
    console.log(searchResult)

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
            type:TAG_SEARCH_REQUEST,
            payload:keyword
        })
    }
    const resetValue=useRef(null)

    return (       
<Paper className="paper_tagadd">
<AppBar className="searchBar" position="static" color="default" elevation={0}>
  <Toolbar  style={{marginBottom:"5px"}}>
  <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className="block" color="inherit"  style={{marginLeft:"20px", marginTop:"3px"}} />
            </Grid>
            <Grid item xs>     
            <Fragment>
            <Form  className="col mt-2">
            <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{    marginBottom:"5px",width: "80%" , left: "-25px", top: "-20px",  position: "absolute"}}/>
            </Form>
            <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{position: "absolute", right: "100px", top: "10px",  marginBottom:"5px"}}>
          검색
            </Button>
        </Fragment>  
            </Grid>
          </Grid>

  </Toolbar>
</AppBar>
    <div className="contentWrapper">
    <Tagtable tags={searchResult}/>
      </div>
</Paper>




    )
}


export default SearchInput