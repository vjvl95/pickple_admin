import axios from 'axios';
import { TAG_LOADING_FAILURE, TAG_LOADING_REQUEST, TAG_LOADING_SUCCESS, TAG_SEARCH_SUCCESS,TAG_SEARCH_FAILURE,TAG_SEARCH_REQUEST, TAG_DELETE_SUCCESS, TAG_DELETE_REQUEST,TAG_DELETE_FAILURE,TAG_UPLOADING_SUCCESS,TAG_UPLOADING_REQUEST,TAG_UPLOADING_FAILURE} from "../../actions/tagAction";
import { all, call, put, takeEvery,fork } from 'redux-saga/effects';


const loadTagAPI = (payload) =>
{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
        params:payload.params
    }
    return axios.get("/api/v1/tag",config);
}

function* loadTag(action){
    try{    
        const result= yield call(loadTagAPI,action.payload)
        yield put({
            type:TAG_LOADING_SUCCESS,
            payload: result.data.data
        })
    } catch(error){
        if(error.response.status===403) 
        {
            localStorage.removeItem("token");
        }         
        yield put({
            type: TAG_LOADING_FAILURE,
            payload:error
        })
    }
}

function* watchLoadTag(){
    yield takeEvery(TAG_LOADING_REQUEST, loadTag)
}

const uploadTagAPI = (payload) =>
{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        }
    }
        
    return axios.post("/api/v1/tag",payload,config);
}

function* uploadTag(action){
    try{
         yield call(uploadTagAPI,action.payload)
        yield put({
            type:TAG_UPLOADING_SUCCESS,
        })
        alert("태그등록에 성공했습니다.")
        window.location.reload()

    } catch(e){
        
        if(e.response.status===403) 
        {
            localStorage.removeItem("token");
        }      
        if(e.response.data.code==="TG02")
        {
            alert("이미 해당 태그가 존재합니다.")
        }
        else if(e.response.data.code==="GE01")
        {
            alert("내용을 입력하셔야 합니다.")
        }
        yield put({
            type: TAG_UPLOADING_FAILURE,
            payload:e,
        })

        window.location.reload()

    }
}

function* watchUploadTag(){
    yield takeEvery(TAG_UPLOADING_REQUEST, uploadTag)
}


const deleteTagAPI = (payload) =>
{
    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        }
    }
    return axios.delete(`/api/v1/tag/${payload}`,config);
}

function* deleteTag(action){
    try{
        yield call(deleteTagAPI, action.payload)
        yield put({
            type:TAG_DELETE_SUCCESS,
        })
        alert("삭제되었습니다.")
        window.location.reload()

    } catch(e){
         
        if(e.response.status===403) 
        {
            localStorage.removeItem("token");
        }      
        yield put({
            type: TAG_DELETE_FAILURE,
            payload:e,
        })
        alert("삭제에 실패하였습니다.")

    }
}
function* watchDeleteTag(){
    yield takeEvery(TAG_DELETE_REQUEST, deleteTag)
}


const SearchTagAPI = (payload) =>{

    const config = {
        headers:{
            "Content-Type" : "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token")
        },
    }
    return axios.post(`/api/v1/tag/search/`,payload,config);
}

function* SearchTag(action){
    try{
        const result= yield call(SearchTagAPI, action.payload)
        yield put({
            type:TAG_SEARCH_SUCCESS,
            payload: result.data.data
        })
    } catch(e){
         
        if(e.response.status===403) 
        {
            localStorage.removeItem("token");
        }      
        yield put({
            type: TAG_SEARCH_FAILURE,
            payload:e
        })
    }
}
function* watchSearchTag(){
    yield takeEvery(TAG_SEARCH_REQUEST, SearchTag)
}

export default function* tagSaga(){
    yield all([fork(watchLoadTag),fork(watchSearchTag),fork(watchDeleteTag),fork(watchUploadTag)]);
}