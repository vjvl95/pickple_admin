import { TAG_SEARCH_REQUEST,TAG_SEARCH_SUCCESS,TAG_SEARCH_FAILURE,TAG_LOADING_FAILURE, TAG_LOADING_REQUEST, TAG_LOADING_SUCCESS,TAG_DELETE_REQUEST,TAG_DELETE_SUCCESS,TAG_DELETE_FAILURE, TAG_UPLOADING_SUCCESS,TAG_UPLOADING_REQUEST,TAG_UPLOADING_FAILURE } from "../../actions/tagAction";

const initialState={
    token:localStorage.getItem('token'),
    loading : false,
    tags:[],
    tagid:"",
    totalElements:"",
    totalPages:"",
    error:"",
    keyword:"",
    searchResult:"",
    sucessMsg:""
};

   const tagReducer = (state = initialState, action) => {
    switch (action.type) {        
        case TAG_LOADING_REQUEST:
            return {
                ...state,
                tags:[],
                loading: true
            }
        case TAG_LOADING_SUCCESS:
            return {
                ...state,
                tags:[...state.tags, ...action.payload.content],
                totalElements:action.payload.totalElements,
                loading: false,
            }
        case TAG_LOADING_FAILURE:
            return {
                ...state,
                tags:[],
                loading: false,
            }
        case TAG_UPLOADING_REQUEST:
            return {
                ...state,
                tags:[],
                loading: true
            }
        case TAG_UPLOADING_SUCCESS:
            return { 
                ...state,
                tags:[...state.tags],
                loading: false,
                sucessMsg:"태그등록에 성공하였습니다"
            }
        case TAG_UPLOADING_FAILURE:
            return {
                ...state,
                tags:[],
                loading: false,
            }

        case TAG_SEARCH_REQUEST:
            return {
                ...state,
                keyword:action.payload,
                loading: true
            }
        case TAG_SEARCH_SUCCESS:
            return {
                ...state,
                searchResult: action.payload,
                loading: false,
            }
        case TAG_SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
            }        
        
        case TAG_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TAG_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case TAG_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
            }        
        default:
            return state
    }
}


export default tagReducer;
