import axios from 'axios'
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { push } from "connected-react-router";

import { REPORT_LOADING_REQUEST,REPORT_LOADING_FAILURE,REPORT_LOADING_SUCCESS,REPORT_SEARCH_SUCCESS,REPORT_SEARCH_FAILURE,REPORT_SEARCH_REQUEST } from "../../actions/reportAction"

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
        params:payload.params
    }
    return axios.get("/api/v1/report/search",config)
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
        yield put({
            type:REPORT_SEARCH_FAILURE,
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

export default function* reportSaga(){
    yield all(
        [fork(watchLoadReport),fork(watchSearchReport)] );
}
