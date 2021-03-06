import axios from 'axios';
import { USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS, USER_DETAIL_SUCCESS,USER_DETAIL_FAILURE,USER_DETAIL_REQUEST,USER_SEARCH_SUCCESS, USER_SEARCH_FAILURE, USER_SEARCH_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_REQUEST, USER_DELETE_FAILURE, USER_UPLOAD_SUCCESS,USER_UPLOAD_FAILURE,USER_UPLOAD_REQUEST } from "../../actions/userAction";
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { push } from "connected-react-router";

const loadUserAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    return axios.get("/api/v1/account",payload,config);
}

function* loadUser(action){
    try{
        const result= yield call(loadUserAPI,action.payload)

        yield put({
            type:USER_LOADING_SUCCESS,
            payload: result.data.data
        })
    } catch(e){
         
        if(e.response.status===403) 
        {
            localStorage.removeItem("token");
        }      
        yield put({
            type: USER_LOADING_FAILURE,
            payload:e
        })
    }
}

const loadUserDetailAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    return axios.get(`/api/v1/account/${payload}`,config);
}

function* loadUserDetail(action){
    try{
        const result= yield call(loadUserDetailAPI,action.payload)
        yield put({
            type:USER_DETAIL_SUCCESS,
            payload: result.data.data
        })
    } catch(e){
         
        if(e.response.status===403) 
        {
            localStorage.removeItem("token");
        }      
        yield put({
            type: USER_DETAIL_FAILURE,
            payload:e
        })
    }
    
}


const UserDeleteAPI = (payload) =>{
    return axios.delete("/api/v1/account",{ headers:{"X-AUTH-TOKEN":localStorage.getItem("token"),"Content-Type" : "application/json"} , data:{idString: payload.idString}});
}


function* UserDelete(action){
    try{
       yield call(UserDeleteAPI,action.payload)

        yield put({
            type:USER_DELETE_SUCCESS,
        })
        alert(action.payload.name+"?????? ?????????????????????.")
        yield put(push("/admin/user"))
    } catch(e){
         
        if(e.response.status===403) 
        {
            localStorage.removeItem("token");
        }      
        yield put({
            type: USER_DELETE_FAILURE,
            payload:e
        })
    }    
}


const UserSearchAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    return axios.post(`/api/v1/account/search`,payload,config);
}


function* UserSearch(action){
    try{
        
        const result= yield call(UserSearchAPI,action.payload)

        yield put({
            type:USER_SEARCH_SUCCESS,
            payload:result.data.data,
            currentPage:action.currentPage,
        })
    } catch(e){
 
        if(e.response.status===403) 
        {
            localStorage.removeItem("token");
        }      

        yield put({
            type: USER_SEARCH_FAILURE,
            payload:e
        })
    }    
}

const UserUploadAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }

    return axios.put("/api/v1/account/",payload,config);
}


function* UserUpload(action){
    try{
        yield call(UserUploadAPI,action.payload)

        yield put({
            type:USER_UPLOAD_SUCCESS,
        })
        alert("??????????????? ?????????????????????.")
        window.location.reload()

    } catch(e){

         
        if(e.response.status===403) 
        {
            localStorage.removeItem("token");
        }      

        yield put({
            type: USER_UPLOAD_FAILURE,
            payload:e
        })
    }    
}





function* watchUserDelete(){
    yield takeEvery(USER_DELETE_REQUEST, UserDelete)
}

function* watchLoadUser(){
    yield takeEvery(USER_LOADING_REQUEST, loadUser)
}

function* watchLoadUserDetail(){
    yield takeEvery(USER_DETAIL_REQUEST, loadUserDetail)
}

function* watchLoadUserSearch(){
    yield takeEvery(USER_SEARCH_REQUEST, UserSearch)
}

function* watchUserUpload(){
    yield takeEvery(USER_UPLOAD_REQUEST, UserUpload)
}


export default function* userSaga() {
      
    yield all([
       fork(watchLoadUser), fork(watchLoadUserDetail), fork(watchUserDelete),fork(watchLoadUserSearch), fork(watchUserUpload)
    ]);
  }