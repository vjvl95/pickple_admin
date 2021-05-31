import React from 'react'
import "./login.css"
import Pagination from '@material-ui/lab/Pagination';;

const Paginations = ({postsPerPage,totalPosts,paginate,page}) =>{
    
    const pageNumbers=[];
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