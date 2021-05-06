import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tagReducer from "./tagReducer";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import boardReducer from "./boardReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    tag: tagReducer,
    user:userReducer,
    login:loginReducer,
    board:boardReducer,
  });

export default createRootReducer;