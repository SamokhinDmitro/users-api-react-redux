import {CHANGE_TITLE, SET_USERS} from "./actions/actionsTypes";

const initState = {
    data: [],
    title: 'My redux title'
};

const rootReducers = (state = initState, action) => {
    switch(action.type){
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.payload
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

export default rootReducers;


