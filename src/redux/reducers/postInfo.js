import {SET_POST_AUTHOR, SET_POST_COMMENTS, SET_POST_INFO} from "../actions/actionsTypes";

const initState = {
    info: [],
    author: '',
    comments: []
};

const postInfo = (state = initState, action) => {
    switch (action.type) {
        case SET_POST_INFO:
            return {
                ...state,
                info: action.payload
            }
        case SET_POST_AUTHOR:
            return {
                ...state,
                author: action.payload
            }
        case SET_POST_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state;
    }
}

export default postInfo;

