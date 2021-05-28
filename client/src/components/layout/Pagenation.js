import React from 'react'
import { useEffect,useState} from 'react';
import { PaginationItem } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import "./login.css"
import Pagination from '@material-ui/lab/Pagination';;

const Paginations = ({postsPerPage,totalPosts,paginate,page}) =>{
    
    const pageNumbers=[];
    const { pathname } = useLocation();
    const pages=page;
    const handleOnclick=(event, value)=>{
        paginate(value)
      }
    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++)
    {
        pageNumbers.push(i);
    }
    
    return(
       <div>
        <Pagination size="small" count={pageNumbers.slice(-1)[0]} page={page} onChange={handleOnclick} />
        </div>
        )
}

export default Paginations