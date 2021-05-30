import axios from 'axios'
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { push } from "connected-react-router";

import { PROFILE_LOADING_FAILURE, PROFILE_LOADING_REQUEST, PROFILE_LOADING_SUCCESS,PROFILE_DETAIL_FAILURE,PROFILE_DETAIL_REQUEST,PROFILE_DETAIL_SUCCESS,PROFILE_SEARCH_SUCCESS,PROFILE_SEARCH_REQUEST,PROFILE_SEARCH_FAILURE,PROFILE_CLOSE_FAILURE,PROFILE_CLOSE_REQUEST,PROFILE_CLOSE_SUCCESS,PROFILE_OPEN_FAILURE,PROFILE_OPEN_SUCCESS,PROFILE_OPEN_REQUEST } from "../../actions/profileAction"

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

const openProfileAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }

    return axios.put("/api/v1/profile/visibility",payload,config)
}

function* openProfile (action)
{
    console.log(action)
    try {
    const result =  yield call(openProfileAPI,action.payload)
    console.log(result)
    yield put({
        type:PROFILE_OPEN_SUCCESS,
    })    
    alert("프로필이 공개 처리 되었습니다.")
    window.location.reload()

    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:PROFILE_OPEN_FAILURE,
            payload: error,
          });
    }
}

const closeProfileAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }

    return axios.put("/api/v1/profile/visibility",payload,config)
}

function* closeProfile (action)
{
    console.log(action)
    try {
    const result =  yield call(closeProfileAPI,action.payload)
    console.log(result)
    yield put({
        type:PROFILE_CLOSE_SUCCESS,
    })
    alert("프로필이 비공개 처리 되었습니다.")
    window.location.reload()
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:PROFILE_CLOSE_FAILURE,
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
function* watchopenProfile(){
    yield takeEvery(PROFILE_OPEN_REQUEST,openProfile)
}
function* watchcloseProfile(){
    yield takeEvery(PROFILE_CLOSE_REQUEST,closeProfile)
}
function* watchSearchProfiledetail(){
    yield takeEvery(PROFILE_SEARCH_REQUEST,searchProfile)
}

export default function* profileSage(){
    yield all([fork(watchLoadProfiledetail),fork(watchSearchProfiledetail),fork(watchopenProfile),fork(watchcloseProfile)]);
}

