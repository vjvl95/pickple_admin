import { PROFILE_LOADING_FAILURE, PROFILE_LOADING_REQUEST, PROFILE_LOADING_SUCCESS,PROFILE_DETAIL_REQUEST,PROFILE_DETAIL_FAILURE,PROFILE_DETAIL_SUCCESS } from "../../actions/profileAction"

const initialState={

    isAuthenticated: null,
    profiles: [],
    profileDetail: [],
    loading: false,
    resultMsg:"",
    tags:[],
    profileId:"",
    profiletagList:[],
    kakaoId:"",
    totalElements:"",

}


const profileReducer =(state= initialState, action) =>{
    switch(action.type)
    {
        case PROFILE_LOADING_REQUEST:
            return {
                ...state,
                profiles:[],
                loading: true
            }
    
        case PROFILE_LOADING_SUCCESS:
            return {
                ...state,
                profiles:action.payload,
                totalElements:action.payload.totalElements,

                loading: true
            }
        case PROFILE_LOADING_FAILURE:
            return {
                ...state,
                loading: true
            }

        case PROFILE_DETAIL_REQUEST:
                return {
                    ...state,
                    profileDetail:[],
                    loading: true
                }
        
        case PROFILE_DETAIL_SUCCESS:
                return {
                    ...state,
                    profileDetail:action.payload,
                    loading: true
                }
        case PROFILE_DETAIL_FAILURE:
                return {
                    ...state,
                    loading: true
                }

        default :
            return state;

    }
}

export default profileReducer;
