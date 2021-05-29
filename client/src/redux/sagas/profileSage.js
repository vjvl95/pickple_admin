import axios from 'axios'
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { push } from "connected-react-router";

import { PROFILE_LOADING_FAILURE, PROFILE_LOADING_REQUEST, PROFILE_LOADING_SUCCESS,PROFILE_DETAIL_FAILURE,PROFILE_DETAIL_REQUEST,PROFILE_DETAIL_SUCCESS,PROFILE_SEARCH_SUCCESS,PROFILE_SEARCH_REQUEST,PROFILE_SEARCH_FAILURE } from "../../actions/profileAction"

/*
const loadProfileAPI = (payload) =>{
    
    console.log(payload)

    return axios.get("/api/v1/profile",payload)
}

function* loadProfile (action)
{
    console.log(action)
    try {
    const result =  yield call(loadProfileAPI,action.payload)
    console.log(result)
    yield put({
        type:PROFILE_LOADING_SUCCESS,
        payload:result.data.data.content
    })
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:PROFILE_LOADING_FAILURE,
            payload: error,
          });

    }
}

*/

const searchProfileAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }

    return axios.post("/api/v1/profile/search",payload,config)
}

function* searchProfile (action)
{
    console.log(action)
    try {
    const result =  yield call(searchProfileAPI,action.payload)
    console.log(result)
    yield put({
        type:PROFILE_SEARCH_SUCCESS,
        payload:result.data.data
    })
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:PROFILE_SEARCH_FAILURE,
            payload: error,
          });

    }
}





const loadProfiledetailAPI = (payload) =>{
    
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        }
    }
    return axios.get(`/api/v1/profile/${payload}`,config)
}

function* loadProfiledetail (action)
{
    console.log(action)
    try {
    const result =  yield call(loadProfiledetailAPI,action.payload)
    console.log(result)
    yield put({
        type:PROFILE_DETAIL_SUCCESS,
        payload:result.data.data
    })
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:PROFILE_DETAIL_FAILURE,
            payload: error,
          });

    }
}






function* watchLoadProfiledetail(){
    yield takeEvery(PROFILE_DETAIL_REQUEST,loadProfiledetail)
}

function* watchSearchProfiledetail(){
    yield takeEvery(PROFILE_SEARCH_REQUEST,searchProfile)
}

export default function* profileSage(){
    yield all([fork(watchLoadProfiledetail),fork(watchSearchProfiledetail)]);
}

