import {SET_USER_INFO, SET_USER_POSTS} from "../actions/actionsTypes";


const initState = {
    info: [],
    posts: []
};

const userInfo = (state = initState, action) => {
    switch(action.type){
        case SET_USER_INFO:
                return {
                    ...state,
                    info: action.payload
                }

        case SET_USER_POSTS:
            return {
                ...state,
                posts: action.payload
            }

        default:
            return state;
    }

}

export default userInfo;
