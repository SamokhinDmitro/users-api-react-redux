import {combineReducers} from "redux";
import users from "./reducers/users";
import posts from "./reducers/posts";
import userInfo from "./reducers/userInfo";
import postInfo from "./reducers/postInfo";

export default combineReducers({users, posts, userInfo, postInfo});
