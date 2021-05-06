import { BOARD_LOADING_FAILURE, BOARD_LOADING_REQUEST, BOARD_LOADING_SUCCESS,BOARD_DETAIL_REQUEST, BOARD_DETAIL_SUCCESS,BOARD_DETAIL_FAILURE } from "../../actions/boardAction"

const initialState={
    isAuthenticated: null,
    loading : false,
    boards:[],
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
    boarddetail:"",
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
                boards:[...state.boards,...action.payload],
            }
     case BOARD_LOADING_FAILURE:
                return{
                    ...state,
                }
     case BOARD_DETAIL_REQUEST:
            return{
                ...state,
            }
     case BOARD_DETAIL_SUCCESS:
            return{
                ...state,
            }
     case BOARD_DETAIL_FAILURE:
                return{
                    ...state,
                }
     default:
            return state;
    }
}
export default boardReducer;
