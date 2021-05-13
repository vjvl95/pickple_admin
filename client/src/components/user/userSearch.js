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
   
    const onChange= (e) => {
        setValues(
            {
                ...form,
                [e.target.name]:e.target.value
            }
        )
    }

    const classes = useStyles();
    const [type, setType] = React.useState('');
  
    const handleChange = (event) => {
        setType(event.target.value);
        console.log(type)
    };

    

    const onSubmit = async(e) => {
        await e.preventDefault()
        const {keyword} = form
        console.log(keyword)

        const pageRequest=[]

        dispatch({
            type:USER_SEARCH_REQUEST,
            payload:{params:{keyword:keyword, "pageRequest.direction" : "ASC", "pageRequest.page" : 1, "pageRequest.size":10,type:type}  }
        })
    }

    const resetValue=useRef(null)

    return (       
<Paper className="paper_tagadd">
<AppBar className="searchBar" position="static" color="default" elevation={0} style={{paddingTop: "5px", paddingBottom:"5px"}}>
  <Toolbar  style={{marginBottom:"5px"}}>
  <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className="block" color="inherit"  style={{marginLeft:"20px", marginTop:"3px", position: "absolute", left: "5px", bottom: "6px"}} />
            </Grid>
            <Grid item xs>     
            <Fragment>
            <Form  className="col mt-2">
            <Input name="keyword" onChange={onChange} innerRef={resetValue} style={{    marginBottom:"5px",width: "80%" , left: "-60px", top: "-20px",  position: "absolute"}}/>
            </Form>
            <Button className="searchsubmit" variant="contained" color="primary"  onClick={onSubmit} style={{position: "absolute", right: "17px", top: "10px",  marginBottom:"5px"}}>
          검색
            </Button>

            <FormControl className={classes.formControl} style={{position: "absolute", right: "90px", bottom: "-4px"}}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={handleChange}>
          <MenuItem value="ADMIN">ADMIN</MenuItem>
          <MenuItem value="MEMBER">MEMBER</MenuItem>
          <MenuItem value="ALL">ALL</MenuItem>
        </Select>
      </FormControl>

        </Fragment>  
            </Grid>
          </Grid>

  </Toolbar>
</AppBar>
    <div className="contentWrapper">
    {<Usertable users={searchResult}/>}
      </div>
</Paper>




    )
}


export default SearchInput