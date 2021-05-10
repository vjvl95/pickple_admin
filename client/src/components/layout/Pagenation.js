import React from 'react'
import { useEffect,useState} from 'react';
import { PaginationItem } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import "./login.css"
import Pagination from '@material-ui/lab/Pagination';;

const Paginations = ({postsPerPage,totalPosts,paginate}) =>{
    
    const pageNumbers=[];
    const { pathname } = useLocation();

    useEffect(() => {
    }, [pathname]);


    const [page, setPage]=useState(1);
    const handleOnclick=(event, value)=>{
        paginate(value)
        setPage(value)
      }
    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++)
    {
        pageNumbers.push(i);
    }

     {/*
        <nav>
            <ul className="pagination"  style = {{justifyContent : "center",marginTop:"5px", paddingBottom:"5px"}}>
                {pageNumbers.map(number=> (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
                */}
    return(
       <div>
        <Pagination size="small" count={pageNumbers.slice(-1)[0]} page={page} onChange={handleOnclick} />
        </div>
        )
}

export default Paginations