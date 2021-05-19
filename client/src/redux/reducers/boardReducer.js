import { BOARD_LOADING_FAILURE, BOARD_LOADING_REQUEST, BOARD_LOADING_SUCCESS,BOARD_DETAIL_REQUEST, BOARD_DETAIL_SUCCESS,BOARD_DETAIL_FAILURE,BOARD_DELETE_REQUEST,BOARD_DELETE_SUCCESS,BOARD_DELETE_FAILURE } from "../../actions/boardAction"

const initialState={
    isAuthenticated: null,
    loading : false,
    boards:[],
    boardDetails:[],
    boardid:"",
    wirterId:"",
    boardtype:"",
    paymentMax:"",
    workStartDate:"",
    workEndDate:"",
    recStartDate:"",
    recEndDate:"",
    BoardTagList:[],
    isDeleted:"",
    text:"",
    title:"",
    totalElements:"",
    totalPages:"",
    error:"",
    keyword:"",
    searchResult:"",
};

const boardReducer = (state=initialState,action) =>{
    switch(action.type)
    {
     case BOARD_LOADING_REQUEST:
            return{
                ...state,
                boards:[],

            }
     case BOARD_LOADING_SUCCESS:
            return{
                ...state,
                boards:[...state.boards,...action.payload.content],
                totalElements:action.payload.totalElements
            }
     case BOARD_LOADING_FAILURE:
                return{
                    ...state,
                }
     case BOARD_DETAIL_REQUEST:
            return{
                ...state,
                boardDetails:[],
                title:"",
                text:"",

            }
     case BOARD_DETAIL_SUCCESS:
            return{
                ...state,
                boardDetails:action.payload.data,
                text:action.payload.data.text,
                title:action.payload.data.title,
            }
     case BOARD_DETAIL_FAILURE:
                return{
                    ...state,
                }

                case BOARD_DELETE_REQUEST:
                    return{
                        ...state,
                        boardDetails:[],
                    }
             case BOARD_DELETE_SUCCESS:
                    return{
                        ...state,
                    }
             case BOARD_DELETE_FAILURE:
                        return{
                            ...state,
                        }
     default:
            return state;
    }
}
export default boardReducer;
