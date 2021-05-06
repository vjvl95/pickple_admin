import axios from 'axios';
import { USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS, USER_DETAIL_SUCCESS,USER_DETAIL_FAILURE,USER_DETAIL_REQUEST,USER_SEARCH_SUCCESS, USER_SEARCH_FAILURE, USER_SEARCH_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_REQUEST, USER_DELETE_FAILURE } from "../../actions/userAction";
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { push } from "connected-react-router";

const loadUserAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    console.log(localStorage.getItem("token"))
    return axios.get("/api/v1/account",payload,config);
}

function* loadUser(action){
    try{

        const result= yield call(loadUserAPI,action.payload)
        console.log(result, "loadUser");

        yield put({
            type:USER_LOADING_SUCCESS,
            payload: result.data.data.content
        })
    } catch(e){
        yield put({
            type: USER_LOADING_FAILURE,
            payload:e
        })
    }
}
function* watchLoadUser(){
    yield takeEvery(USER_LOADING_REQUEST, loadUser)
}

const loadUserDetailAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    console.log(localStorage.getItem("token"))
    return axios.get(`/api/v1/account/${payload}`,config);
}

function* loadUserDetail(action){
    try{
        const result= yield call(loadUserDetailAPI,action.payload)
        console.log(result, "loadUserDetail");

        yield put({
            type:USER_DETAIL_SUCCESS,
            payload: result.data.data.content
        })
    } catch(e){
        yield put({
            type: USER_DETAIL_FAILURE,
            payload:e
        })
    }
    
}
function* watchLoadUserDetail(){
    yield takeEvery(USER_DETAIL_REQUEST, loadUserDetail)
}





export default function* userSaga() {
      
    yield all([
       fork(watchLoadUser), fork(watchLoadUserDetail)
    ]);
  }