import {APPLY_LOADING_REQUEST,APPLY_LOADING_FAILURE,APPLY_LOADING_SUCCESS,APPLY_DETAIL_REQUEST,APPLY_DETAIL_SUCCESS,APPLY_DETAIL_FAILURE} from "../../actions/applyAction"

const initialState={
    isAuthenticated: null,
    loading : false,
    applys:[],
    applydetails:[],
    pre_reviewStatetype:"",
    pre_isContracted:"",
    pre_keyword:"",
    sucessMsg:"",
    errorMsg:"",
    totalElements:"",
    totalPages:"",
    pre_page:"",
    
};

const applyReducer = (state=initialState,action) =>{
    switch(action.type)
    {
        case APPLY_LOADING_REQUEST:
            return{
                ...state,
                applys:[],
                isAuthenticated: null,
                loading : true,
            }
     case  APPLY_LOADING_SUCCESS:
            return{
                ...state,
                applys:action.payload.content,
                totalElements:action.payload.totalElements,
                pre_reviewStatetype:action.reviewStatetype,
                pre_isContracted:action.isContracted,
                pre_keyword:action.keyword,
                pre_page:action.currentPage,
                isAuthenticated: null,
                loading : false,

            }
     case  APPLY_LOADING_FAILURE:
                return{
                    ...state,
                    loading : false,

                }

                case APPLY_DETAIL_REQUEST:
                    return{
                        ...state,
                        applydetails:[],
                    }
             case  APPLY_DETAIL_SUCCESS:
                    return{
                        ...state,
                        applydetails:action.payload
                    }
             case  APPLY_DETAIL_FAILURE:
                        return{
                            ...state,
                        }

                       
    default :
               return state;
            }
}

export default applyReducer;
