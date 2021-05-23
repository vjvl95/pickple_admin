import {REPORT_LOADING_REQUEST,REPORT_LOADING_SUCCESS,REPORT_LOADING_FAILURE } from "../../actions/reportAction"
const initialState = {
    reports: [],
    reportdetail: [],
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

        default:
            return state;
    }
}
export default reportReducer;
