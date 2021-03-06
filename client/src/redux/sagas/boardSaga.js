import axios from "axios";
import { BOARD_DETAIL_FAILURE, BOARD_DETAIL_SUCCESS,BOARD_DETAIL_REQUEST,BOARD_LOADING_FAILURE, BOARD_LOADING_REQUEST,BOARD_SEARCH_REQUEST, BOARD_LOADING_SUCCESS,BOARD_DELETE_FAILURE,BOARD_DELETE_SUCCESS,BOARD_DELETE_REQUEST, BOARD_SEARCH_SUCCESS, BOARD_SEARCH_FAILURE } from "../../actions/boardAction"
import { call, put, takeEvery, all, fork} from "redux-saga/effects";
import { push } from "connected-react-router";

const loadBoardAPI = (payload) =>{
    

    return axios.get("/api/v1/recboard",payload)
}

function* loadBoards (action)
{
    try {
    const result =  yield call(loadBoardAPI,action.payload)
    yield put({
        type:BOARD_LOADING_SUCCESS,
        payload:result.data.data
    })
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:BOARD_LOADING_FAILURE,
            payload: error,
          });

    }
}


const loadBoardDetailAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        }
    }
    return axios.get(`/api/v1/recboard/${payload}`,config)
}

function* loadBoardDetail (action)
{
    try {
    const result =  yield call(loadBoardDetailAPI,action.payload)
    yield put({
        type:BOARD_DETAIL_SUCCESS,
        payload:result.data,
    })
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:BOARD_DETAIL_FAILURE,
            payload: error,
          });
    }
}

const deleteBoardAPI = (payload) =>{
    return axios.delete(`/api/v1/recboard/${payload}`,{ headers:{"X-AUTH-TOKEN":localStorage.getItem("token"),"Content-Type" : "application/json"}})
}

function* deleteBoard(action)
{
    try {
    const result =  yield call(deleteBoardAPI,action.payload)
    yield put({
        type:BOARD_DELETE_SUCCESS,
        payload:result.data
    })
    alert("???????????? ?????????????????????.")
    yield put(push("/admin/board"))
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:BOARD_DELETE_FAILURE,
            payload: error,
          });
    }
}


const searchBoardAPI = (payload) =>{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    return axios.post(`/api/v1/recboard/search`,payload,config)
}

function* searchBoard(action)
{

    try {
    const result =  yield call(searchBoardAPI,action.payload)
    yield put({
        type:BOARD_SEARCH_SUCCESS,
        payload:result.data.data,
        pre_direction:action.pre_direction

    })
    } catch (error) {
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type:BOARD_SEARCH_FAILURE,
            payload: error,
          });
    }
}







function* watchDetailBoards(){
    yield takeEvery(BOARD_DETAIL_REQUEST,loadBoardDetail)
}

function* watchLoadBoards(){
    yield takeEvery(BOARD_LOADING_REQUEST,loadBoards)
}

function* watchDeleteBoards(){
    yield takeEvery(BOARD_DELETE_REQUEST,deleteBoard)
}


function* watchSearchBoards(){
    yield takeEvery(BOARD_SEARCH_REQUEST,searchBoard)
}
export default function* boardSaga() {
      
    yield all([
        fork(watchLoadBoards),fork(watchDetailBoards),fork(watchDeleteBoards), fork(watchSearchBoards)
    ]);
  }