import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { REPORT_DETAIL_REQUEST } from '../../actions/reportAction';
import {  useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {RouteComponentProps} from "react-router"
import theme from '../layout/theme'
import styles from '../layout/style'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Header from '../header/UserHeader'
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Reportdetail = (req) =>{

    const dispatch = useDispatch();
    const {reportDetail} = useSelector((state) => state.report);
    const history = useHistory();


    const goBack = () => {
      history.goBack();
     };



    useEffect(()=>{
      dispatch({
        type: REPORT_DETAIL_REQUEST,
        payload:req.match.params.id
      })
      },[dispatch])

    

    return (
        <Fragment>
      
          <Header/>
        <Paper className="paper-detail" elevation={3} style={{margin:"auto",marginTop:"70px",width:"65"}}>
          <div className="contentWrapper-detail">
            <Typography color="textSecondary">
          
            
            </Typography>
          </div>
        </Paper>
        </Fragment>
    
      );
    }


    export default Reportdetail