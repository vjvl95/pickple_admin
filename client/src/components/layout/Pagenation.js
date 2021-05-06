import React from 'react'
import { useEffect,useState} from 'react';

const Pagination = ({postsPerPage,totalPosts}) =>{

    const [page, setPage] = useState(1);

    const pageNumbers=[];
    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++)
    {
        pageNumbers.push(i);
    }

    return(
        <div>
            <ul className="pagination">
                {pageNumbers.map(number=> (
                    <li key={number} className="page-item">
                        <a href="!#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        )
}

export default Pagination