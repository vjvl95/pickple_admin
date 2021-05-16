import React, {Fragment, useState,useRef} from 'react'
import {Form,Input} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux'
import { USER_SEARCH_REQUEST, } from '../../actions/userAction';
import { useParams } from 'react-router';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Usertable from './usertable'
import "../tag/tag.css"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./user.css"
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const SearchInput = () => {
    const dispatch=useDispatch()
    const [form, setValues] = useState({keyword:""})
    const {searchResult} = useSelector((state)=>state.tag)
    const [type, setType] = React.useState('');
    const classes = useStyles();

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

    console.log(type)


    const onSubmit = async(e) => {
        await e.preventDefault()
        const {keyword} = form
        console.log(keyword)

        dispatch({
            type:USER_SEARCH_REQUEST,
            payload:{params:{keyword:keyword, "pageRequest.direction" : "ASC", "pageRequest.page" : 1, "pageRequest.size":10,type:type}  }
        })
    }

    const resetValue=useRef(null)

    return (       
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
          </Grid>
    )
}


export default SearchInput