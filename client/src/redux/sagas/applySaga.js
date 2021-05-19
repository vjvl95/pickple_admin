import axios from "axios";
import { APPLY_LOADING_REQUEST, APPLY_LOADING_FAILURE,APPLY_LOADING_SUCCESS,APPLY_DETAIL_FAILURE,APPLY_DETAIL_REQUEST,APPLY_DETAIL_SUCCESS,REVIEW_ACCEPT_REQUEST, REVIEW_ACCEPT_SUCCESS, REVIEW_ACCEPT_FAILURE, REVIEW_REJECT_SUCCESS, REVIEW_REJECT_FAILURE, REVIEW_REJECT_REQUEST} from "../../actions/applyAction"
import { call, put, takeEvery, all, fork} from "redux-saga/effects";
import { push } from "connected-react-router";


const loadApplyAPI = (payload) =>{
    
    return axios.get("/api/v1/apply",payload)
}

function* loadApplys (action)
{
    console.log(action)
    try {
    const result =  yield call(loadApplyAPI,action.payload)
    console.log(result)
    yield put({
        type:APPLY_LOADING_SUCCESS,
        payload: result.data.data
    })
    } catch (error) {
        yield put({
            type:APPLY_LOADING_FAILURE,
            payload: error,
          });

    }
}

const loadApplyDetailsAPI = (payload) =>{
    
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        }
    }
    return axios.get(`/api/v1/apply/${payload}`,config)
}

function* loadApplysDetails (action)
{
    console.log(action)
    try {
    const result =  yield call(loadApplyDetailsAPI,action.payload)
    console.log(result)
    yield put({
        type:APPLY_DETAIL_SUCCESS,
        payload: result.data.data
    })
    } catch (error) {
        yield put({
            type:APPLY_DETAIL_FAILURE,
            payload: error,
          });

    }
}

const reviewAcceptAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        }
    }

    return axios.put("/api/v1/apply/manage",config,payload)
    
}

function* reviewAccept (action)
{
    console.log(action.payload)
    try {
    const result =  yield call(reviewAcceptAPI,action.payload)
    console.log(result)
    yield put({
        type:REVIEW_ACCEPT_SUCCESS,
    })
    } catch (error) {
        yield put({
            type:REVIEW_ACCEPT_FAILURE,
          });
    }
}

const reviewRejectAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        }
    }
    
    return axios.put("/api/v1/apply/manage",config,payload)
}

function* reviewReject (action)
{
    console.log(action)
    try {
    const result =  yield call(reviewRejectAPI,action.payload)
    console.log(result)
    yield put({
        type:REVIEW_REJECT_SUCCESS,
    })
    } catch (error) {
        yield put({
            type:REVIEW_REJECT_FAILURE,
          });

    }
}










function* watchLoadApplys(){
    yield takeEvery(APPLY_LOADING_REQUEST,loadApplys)
}



function* watchLoadApplyDetails(){
    yield takeEvery(APPLY_DETAIL_REQUEST,loadApplysDetails)
}

function* watchReviewAccept(){
    yield takeEvery(REVIEW_ACCEPT_REQUEST,reviewAccept)
}

function* watchReviewReject(){
    yield takeEvery(REVIEW_REJECT_REQUEST,reviewReject)
}



export default function* applySaga() {
      
    yield all([
        fork(watchLoadApplys),fork(watchLoadApplyDetails),fork(watchReviewAccept), fork(watchReviewReject)
    ]);
  }