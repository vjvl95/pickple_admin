import { USER_LOADING_REQUEST,USER_LOADING_SUCCESS,USER_LOADING_FAILURE,USER_DETAIL_FAILURE,USER_DETAIL_SUCCESS,USER_DETAIL_REQUEST,USER_DELETE_FAILURE,USER_DELETE_REQUEST,USER_DELETE_SUCCESS,USER_SEARCH_FAILURE,USER_SEARCH_REQUEST,USER_SEARCH_SUCCESS} from "../../actions/userAction";
const initialState={
    isAuthenticated: null,
    loading : false,
    users:[],
    account_id:"",
    idString:"",
    password:"",
    name:"",
    nickname:"",
    student_id:"",
    account_type:"",
    phone_number:"",
    email:"",
    is_certifited:"",
    register_type:"",
    is_deleted:"",
    error:"",
    searchBy:"",
    searchResult:""
};

const userReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case USER_LOADING_REQUEST:
            return {
                ...state,
                users:[],
                loading: true
            }
        case USER_LOADING_SUCCESS:
            return {
                ...state,
                users:[...state.users, ...action.payload.content],
                totalElements:action.payload.totalElements,
                loading: false,
            }

        case USER_LOADING_FAILURE:
            return {
                ...state,
                users:[],
                loading: false,
            }

            case USER_DETAIL_REQUEST:
                return {
                    ...state,
                    users:[],
                    loading: true
                }
            case USER_DETAIL_SUCCESS:
                return {
                    ...state,
                    account_id: action.payload.accountId,
                    account_type: action.payload.accountType,
                    email:action.payload.email,
                    idString:action.payload.idString,
                    is_certifited:action.payload.isCertified,
                    is_deleted:action.payload.isDeleted,
                    name:action.payload.name,
                    register_type:action.payload.registerType,
                    loading: false,
            
                }
            case USER_DETAIL_FAILURE:
                return {
                    ...state,
                    users:[],
                    loading: false,
                }

                case USER_DELETE_REQUEST:
                    return {
                        ...state,
                        loading: true
                    }
                case USER_DELETE_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                    }
        
                case USER_DELETE_FAILURE:
                    return {
                        ...state,
                        loading: false,
                    }
        
                    case USER_SEARCH_REQUEST:
                        return {
                            ...state,
                            loading: true
                        }
                    case USER_SEARCH_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                        }
            
                    case USER_SEARCH_FAILURE:
                        return {
                            ...state,
                            loading: false,
                        }


            default:
            return state
        }
    }
    
export default userReducer;
