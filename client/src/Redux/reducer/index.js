import { combineReducers } from "redux";
import userReducer from "./user";
import topicReducer from "./topic";
const rootReducer = combineReducers({ userReducer, topicReducer });

export default rootReducer;
