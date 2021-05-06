import axios from 'axios'
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';
import { LOGIN_FAILURE, LOGIN_SUCCESS,LOGIN_REQUEST } from '../../actions/loginAction'
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
        console.log(result)
        yield put({
            type:LOGIN_SUCCESS,
            payload:result.data

        })
        yield put(push(`/admin/`))

    }
    catch(e){
        yield put({
            type:LOGIN_FAILURE,
            payload:e.response
        })
    }
}

function* watchLoginUser(){
    yield takeEvery(LOGIN_REQUEST,loginUser)
}


export default function* loginSaga()
{
    yield all([fork(watchLoginUser)])
}