import React, {Fragment, useState,useRef} from 'react'
import {Form,Input} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux'
import { TAG_SEARCH_REQUEST } from '../../actions/tagAction';
import { useParams } from 'react-router';


const SearchInput = () => {
    const dispatch=useDispatch()
    const [form, setValues] = useState({keyword:""})
    const {searchResult} = useSelector((state)=>state.tag)
    let {searchTerm}= useParams()

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

    console.log(searchResult)
    return (
        
        <Fragment>
            <Form onSubmit={onSubmit} className="col mt-2">
            <Input name="keyword"
            onChange={onChange}
            innerRef={resetValue}/>
            </Form>
        </Fragment>
    )
}


export default SearchInput