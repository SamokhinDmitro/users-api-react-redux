import {SET_POSTS} from "../actions/actionsTypes";


const initState = {
    posts: [],
    postTitle: 'Posts title redux!!!+-'
};

const posts = (state = initState, action) => {
        switch(action.type){
            case SET_POSTS:
                return {
                    ...state,
                    posts: action.payload
                };

            default:
                return state;
        }
}

export default posts;
