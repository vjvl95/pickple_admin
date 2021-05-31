import axios from 'axios'
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { LOGIN_SUCCESS,LOGIN_REQUEST,LOGOUT_FAILURE,LOGOUT_REQUEST,LOGOUT_SUCCESS } from '../../actions/loginAction'
import { push } from "connected-react-router";

const loginUserAPI = (payload) => {
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    return axios.post('api/v1/signin',payload,config)
}



function* loginUser(action)
{
    try{
        const result = yield call(loginUserAPI,action.payload)
        yield put({
            type:LOGIN_SUCCESS,
            payload:result.data
        })
        yield put(push(`/admin/`))
        window.location.reload()

    }
    catch(e){
    }
}


function* logoutUser()
{
    try{
        yield put({
            type:LOGOUT_SUCCESS,
        })
        yield put(push(`/`))
        window.location.reload()

    }
    catch(e){
        yield put({
            type: LOGOUT_FAILURE,
          });
    }
}





function* watchLoginUser(){
    yield takeEvery(LOGIN_REQUEST,loginUser)
}

function* watchLogoutUser(){
    yield takeEvery(LOGOUT_REQUEST,logoutUser)
}



export default function* loginSaga()
{
    yield all([fork(watchLoginUser),fork(watchLogoutUser)])
}