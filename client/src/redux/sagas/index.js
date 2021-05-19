import { all, fork } from "redux-saga/effects";
import axios from "axios";
import dotenv from "dotenv";
import tagSaga from "./tagSaga";
import userSaga from "./userSaga"
import loginSaga from "./loginSaga"
import boardSaga from "./boardSaga"
import profileSage from "./profileSage";
import applySaga from "./applySaga";
import reportSaga from "./reportSaga"
dotenv.config();

// 서버와 통신하는 부분 
axios.defaults.baseURL =process.env.REACT_APP_BASIC_SERVER_URL;
//axios.defaults.baseURL ='http://localhost:3001';
export default function* rootSaga() {
  yield all([fork(tagSaga),fork(userSaga),fork(loginSaga),fork(boardSaga), fork(profileSage),fork(applySaga), fork(reportSaga)]);
}
