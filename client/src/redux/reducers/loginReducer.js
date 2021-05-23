import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,LOGOUT_REQUEST,LOGOUT_FAILURE,LOGOUT_SUCCESS } from "../../actions/loginAction"
const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:"",
    userId:"",
    errorMsg:"",
    successMsg:"",
}

const loginReducer=(state= initialState, action) => {
    switch(action.type)
    {
      case LOGIN_REQUEST:
            return{
                ...state,
                errorMsg:"",
                isLoading:true,
            }
      case LOGIN_SUCCESS:{
          localStorage.setItem("token",action.payload.data.token)
          return{
              ...state,
              ...action.payload,
              isAuthenticated:true,
              errorMsg: "",
              isLoading: true,
          }
        }
      case LOGIN_FAILURE:{
            return {
              ...state,
              ...action.payload,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            };
        }
       
   case LOGOUT_REQUEST:
          return{
              ...state,
              errorMsg:"",
              isLoading:true,
          }
    case LOGOUT_SUCCESS:{
        localStorage.removeItem("token")
        return{
            ...state,
            ...action.payload,
            isAuthenticated:false,
            errorMsg: "",
            isLoading: true,
        }
      }
    case LOGOUT_FAILURE:{
          return {
            ...state,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          };
      }
        
  case CLEAR_ERROR_REQUEST:
        return {
          ...state,
          resultMsg: null,
        };
      case CLEAR_ERROR_SUCCESS:
        return {
          ...state,
          resultMsg: null,
        };
      case CLEAR_ERROR_FAILURE:
        return {
          ...state,
          resultMsg: null,
        };
     


        default:
            return state;

    }
}

export default loginReducer;
