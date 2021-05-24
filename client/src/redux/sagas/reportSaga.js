import axios from 'axios'
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { push } from "connected-react-router";

import { REPORT_LOADING_REQUEST,REPORT_LOADING_FAILURE,REPORT_LOADING_SUCCESS } from "../../actions/reportAction"

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


function* watchLoadReport(){
    yield takeEvery(REPORT_LOADING_REQUEST,loadReport)
}

export default function* tagSaga(){
    yield all([fork(watchLoadReport)]);
}
