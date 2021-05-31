import {REPORT_LOADING_REQUEST,REPORT_LOADING_SUCCESS,REPORT_LOADING_FAILURE,REPORT_SEARCH_FAILURE,REPORT_SEARCH_REQUEST,REPORT_SEARCH_SUCCESS,REPORT_DETAIL_FAILURE,REPORT_DETAIL_SUCCESS,REPORT_DETAIL_REQUEST } from "../../actions/reportAction"
const initialState = {
    reports: [],
    reportdetail: [],
    pre_page:"",
    totalElements:"",
    errorMsg: "",
    successMsg: "",
}

const reportReducer = (state = initialState, action) => {
    switch (action.type) {

        case REPORT_LOADING_REQUEST:
            return {
                ...state,
                reports: [],
                totalElements:"",
                loading: true
            }

        case REPORT_LOADING_SUCCESS:
            return {
                ...state,
                reports: action.payload.content,
                totalElements: action.payload.totalElements,
            }
        case REPORT_LOADING_FAILURE:
            return {
                ...state,
            }
            case REPORT_SEARCH_REQUEST:
                return {
                    ...state,
                    reports: [],
                    totalElements:"",
                    loading: true
                }
    
            case REPORT_SEARCH_SUCCESS:
                return {
                    ...state,
                    reports: action.payload.content,
                    totalElements: action.payload.totalElements,
                    pre_page:action.currentPage
                }
            case REPORT_SEARCH_FAILURE:
                return {
                    ...state,
                }
                case REPORT_DETAIL_REQUEST:
                    return {
                        ...state,
                        reportdetail: [],
                        loading: true
                    }
        
                case REPORT_DETAIL_SUCCESS:
                    return {
                        ...state,
                        reportdetail: action.payload,
                    }
                case REPORT_DETAIL_FAILURE:
                    return {
                        ...state,
                    }

        default:
            return state;
    }
}
export default reportReducer;
