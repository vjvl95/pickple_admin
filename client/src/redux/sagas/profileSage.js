import axios from 'axios'
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { push } from "connected-react-router";

import { PROFILE_LOADING_FAILURE, PROFILE_LOADING_REQUEST, PROFILE_LOADING_SUCCESS,PROFILE_DETAIL_FAILURE,PROFILE_DETAIL_REQUEST,PROFILE_DETAIL_SUCCESS } from "../../actions/profileAction"

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
        yield put({
            type:PROFILE_LOADING_FAILURE,
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
        yield put({
            type:PROFILE_DETAIL_FAILURE,
            payload: error,
          });

    }
}






function* watchLoadProfile(){
    yield takeEvery(PROFILE_LOADING_REQUEST,loadProfile)
}


function* watchLoadProfiledetail(){
    yield takeEvery(PROFILE_DETAIL_REQUEST,loadProfiledetail)
}

export default function* profileSage(){
    yield all([fork(watchLoadProfile),fork(watchLoadProfiledetail)]);
}

