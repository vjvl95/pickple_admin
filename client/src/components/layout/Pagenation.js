import React from 'react'
import { useEffect,useState} from 'react';
import { PaginationItem } from 'reactstrap';

const Pagination = ({postsPerPage,totalPosts,paginate}) =>{
    
    const pageNumbers=[];

    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++)
    {
        pageNumbers.push(i);
    }

    return(
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
        )
}

export default Pagination