import axios from "axios";
import { BOARD_DETAIL_FAILURE, BOARD_DETAIL_SUCCESS,BOARD_DETAIL_REQUEST,BOARD_LOADING_FAILURE, BOARD_LOADING_REQUEST, BOARD_LOADING_SUCCESS } from "../../actions/boardAction"
import { call, put, takeEvery, all, fork} from "redux-saga/effects";
import { push } from "connected-react-router";

const loadBoardAPI = (payload) =>{
    
    console.log(payload)

    return axios.get("/api/v1/recboard",payload)
}

function* loadBoards (action)
{
    console.log(action)
    try {
    const result =  yield call(loadBoardAPI,action.payload)
    console.log(result.data.data.content)
    yield put({
        type:BOARD_LOADING_SUCCESS,
        payload:result.data.data.content
    })
    } catch (error) {
        yield put({
            type:BOARD_LOADING_FAILURE,
            payload: error,
          });

    }
}

function* watchLoadBoards(){
    yield takeEvery(BOARD_LOADING_REQUEST,loadBoards)
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
    console.log(action)
    try {
    const result =  yield call(loadBoardDetailAPI,action.payload)
    console.log(result)
    yield put({
        type:BOARD_DETAIL_SUCCESS,
        payload:result.data.data.content
    })
    } catch (error) {
        yield put({
            type:BOARD_DETAIL_FAILURE,
            payload: error,
          });
    }
}

function* watchDetailBoards(){
    yield takeEvery(BOARD_DETAIL_REQUEST,loadBoardDetail)
}

export default function* boardSaga() {
      
    yield all([
        fork(watchLoadBoards),fork(watchDetailBoards)
    ]);
  }