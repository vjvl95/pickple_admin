import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tagReducer from "./tagReducer";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import boardReducer from "./boardReducer";
import profileReducer from "./profileReducer";
import applyReducer from "./applyReducer"
import reportReducer from "./reportReducer"
const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    tag: tagReducer,
    user:userReducer,
    login:loginReducer,
    board:boardReducer,
    profile:profileReducer,
    apply:applyReducer,
    report:reportReducer,
  });

export default createRootReducer;