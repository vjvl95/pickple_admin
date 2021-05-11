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
    return axios.get("/api/v1/account",payload,config);
}

function* loadUser(action){
    try{
        const result= yield call(loadUserAPI,action.payload)
        console.log(result, "loadUser");

        yield put({
            type:USER_LOADING_SUCCESS,
            payload: result.data.data
        })
    } catch(e){
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
    console.log(localStorage.getItem("token"))
    return axios.get(`/api/v1/account/${payload}`,config);
}

function* loadUserDetail(action){
    try{
        const result= yield call(loadUserDetailAPI,action.payload)
        console.log(result, "loadUserDetail");

        yield put({
            type:USER_DETAIL_SUCCESS,
            payload: result.data.data
        })
    } catch(e){
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
        const result= yield call(UserDeleteAPI,action.payload)
        console.log(result, "UserDelete");

        yield put({
            type:USER_DELETE_SUCCESS,
        })
        alert(action.payload.name+"님이 삭제되었습니다.")
        yield put(push("/admin/user"))
    } catch(e){
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

    console.log(payload.pageRequest.direction)
    console.log(payload.pageRequest.page)
    console.log(payload.pageRequest.size)


    return axios.get(`/api/v1/account/search?pageRequest.direction=${payload.pageRequest.direction}&pageRequest.page=${payload.pageRequest.page}&pageRequest.size=${payload.pageRequest.size}&type=${payload.pageRequest.type}`,config);
}


function* UserSearch(action){
    try{
        const result= yield call(UserSearchAPI,action.payload)
        console.log(result, "UserSearch");

        yield put({
            type:USER_SEARCH_SUCCESS,
        })
        alert(action.payload.name+"님이 삭제되었습니다.")
        yield put(push("/admin/user"))
    } catch(e){
        yield put({
            type: USER_SEARCH_FAILURE,
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



export default function* userSaga() {
      
    yield all([
       fork(watchLoadUser), fork(watchLoadUserDetail), fork(watchUserDelete),fork(watchLoadUserSearch)
    ]);
  }