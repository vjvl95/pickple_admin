import {APPLY_LOADING_REQUEST,APPLY_LOADING_FAILURE,APPLY_LOADING_SUCCESS,APPLY_DETAIL_REQUEST,APPLY_DETAIL_SUCCESS,APPLY_DETAIL_FAILURE} from "../../actions/applyAction"

const initialState={
    isAuthenticated: null,
    loading : false,
    applys:[],
    applydetails:[],
    sucessMsg:"",
    errorMsg:"",
    totalElements:"",
    totalPages:"",
};

const applyReducer = (state=initialState,action) =>{
    switch(action.type)
    {
        case APPLY_LOADING_REQUEST:
            return{
                ...state,
                applys:[],

            }
     case  APPLY_LOADING_SUCCESS:
            return{
                ...state,
                applys:[...state.applys,...action.payload.content],
                totalElements:action.payload.totalElements
            }
     case  APPLY_LOADING_FAILURE:
                return{
                    ...state,
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
