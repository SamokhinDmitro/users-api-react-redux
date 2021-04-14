import {SEARCH_USERS_NAME, SET_USERS} from "../actions/actionsTypes";

const initState = {
    data: [],
    searchName: ''
};

const users = (state = initState, action) => {
    switch(action.type){
        case SEARCH_USERS_NAME:
            return {
                ...state,
                searchName: action.payload
            }

        case SET_USERS:
            return {
                ...state,
                data: action.payload
            }

        default:
            return state;
    }

}

export default users;
