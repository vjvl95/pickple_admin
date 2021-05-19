import {REPORT_LOADING_REQUEST,REPORT_LOADING_SUCCESS,REPORT_LOADING_FAILURE } from "../../actions/reportAction"
const initialState = {
    reports: [],
    reportdetail: [],
    totalElements:"",
    errorMsg: "",
    successMsg: "",
}

const reportReducer = (state = initialState, action) => {

    switch (action) {

        case REPORT_LOADING_REQUEST:
            return {
                ...state,
                reports: [],
                loading: true
            }

        case REPORT_LOADING_SUCCESS:
            return {
                ...state,
                reports: action.payload,
                totalElements: action.payload.totalElements,

                loading: true
            }
        case REPORT_LOADING_FAILURE:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}
export default reportReducer;
