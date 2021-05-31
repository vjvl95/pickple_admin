import axios from 'axios'
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { push } from "connected-react-router";

import { REPORT_LOADING_REQUEST,REPORT_LOADING_FAILURE,REPORT_LOADING_SUCCESS,REPORT_SEARCH_SUCCESS,REPORT_SEARCH_FAILURE,REPORT_SEARCH_REQUEST,REPORT_DETAIL_FAILURE,REPORT_DETAIL_SUCCESS,REPORT_DETAIL_REQUEST,REPORT_MANAGE_FAILURE,REPORT_MANAGE_SUCCESS,REPORT_MANAGE_REQUEST } from "../../actions/reportAction"

const loadReportAPI = (payload) =>{
    console.log(payload)
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
        params:payload.params
    }
    return axios.get("/api/v1/report",config)
}

function* loadReport (action)
{
    console.log(action)
    try {
    const result =  yield call(loadReportAPI,action.payload)
    yield put({
        type:REPORT_LOADING_SUCCESS,
        payload:result.data.data
    })
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:REPORT_LOADING_FAILURE,
            payload: error,
          });

    }
}


const searchReportAPI = (payload) =>{
    console.log(payload)
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    return axios.post("/api/v1/report/search",payload,config)
}

function* searchReport (action)
{
    console.log(action)
    try {
    const result =  yield call(searchReportAPI,action.payload)
    yield put({
        type:REPORT_SEARCH_SUCCESS,
        payload:result.data.data
    })
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:REPORT_SEARCH_FAILURE,
            payload: error,
          });

    }
}



const loadDetailReportAPI = (payload) =>{
    console.log(payload)
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    return axios.get(`/api/v1/report/${payload}`,config)
}

function* loadDetailReport (action)
{
    console.log(action)
    try {
    const result =  yield call(loadDetailReportAPI,action.payload)
    console.log(result)

    yield put({
        type:REPORT_DETAIL_SUCCESS,
        payload:result.data.data
    })
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:REPORT_DETAIL_FAILURE,
            payload: error,
          });

    }
}

const manageReportAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    return axios.put(`/api/v1/report/manage`,payload,config)
}

function* manageReport (action)
{
    console.log(action)
    try {
    const result =  yield call(manageReportAPI,action.payload)
    console.log(result)

    yield put({
        type:REPORT_MANAGE_SUCCESS,
        payload:result.data.data
    })
    alert("신고가 정상적으로 처리되었습니다.")
    window.location.reload()
} catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:REPORT_MANAGE_FAILURE,
            payload: error,
          });

    }
}




function* watchLoadReport(){
    yield takeEvery(REPORT_LOADING_REQUEST,loadReport)
}


function* watchSearchReport(){
    yield takeEvery(REPORT_SEARCH_REQUEST,searchReport)
}


function* watchLoadDetailReport(){
    yield takeEvery(REPORT_DETAIL_REQUEST,loadDetailReport)
}

function* watchManageReport(){
    yield takeEvery(REPORT_MANAGE_REQUEST,manageReport)
}


export default function* reportSaga(){
    yield all(
        [fork(watchLoadReport),fork(watchSearchReport),fork(watchLoadDetailReport),fork(watchManageReport)] );
}
