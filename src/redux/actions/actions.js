import {
    SEARCH_USERS_NAME,
    SET_POST_AUTHOR,
    SET_POST_COMMENTS,
    SET_POST_INFO,
    SET_POSTS,
    SET_USER_INFO, SET_USER_POSTS,
    SET_USERS
} from "./actionsTypes";
import axios from "axios";


//Users
export const setUsers = data => {
    return {type: SET_USERS, payload: data}
}

//SearchTitle
export const setSearchUsersName = name => {
    return {type: SEARCH_USERS_NAME, payload: name}
}


export const asyncLoadUsers = () => {
    return (dispatch) => {
        //Запрос на сервер
        return axios('https://jsonplaceholder.typicode.com/users')
            .then(data => {
                dispatch(setUsers(data.data));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

//Posts
export const setPosts = data => {
    return {type: SET_POSTS, payload: data}
}

export const asyncLoadPosts = () => {
    return (dispatch) => {
        //Запрос на сервер
        return axios('https://jsonplaceholder.typicode.com/posts')
            .then(data => {
                dispatch(setPosts(data.data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}


//UserInfo
export const setUserInfo = data => {
    return {type: SET_USER_INFO, payload: data}
}

export const asyncLoadUserInfo = id => {
    return (dispatch) => {

          return  axios(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(data => {
                    dispatch(setUserInfo(data.data));

                    dispatch(getUserPosts(data.data.id));
                })
                .catch(error => {
                    console.log(error);
                })
    }
}

export const setUserPosts = data => {
    return {type: SET_USER_POSTS, payload: data}
}

export const getUserPosts = userId => {
    return (dispatch) => {
        return axios(`https://jsonplaceholder.typicode.com/posts`)
            .then(data => {
                const arr = data.data;
                const res = arr.filter(post => {
                    if(post.userId === userId){
                        return post;
                    }else{
                        return null;
                    }
                });

                dispatch(setUserPosts(res));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

//PostInfo
export const setPostInfo = data => {
    return {type: SET_POST_INFO, payload: data}
}

export const asyncLoadPostInfo = id => {
    return (dispatch) => {
        return axios(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(data => {
                dispatch(setPostInfo(data.data));
                //Post author
                dispatch(getPostAuthor(data.data.userId));
                //Post comments
                dispatch(getPostComments(data.data.id))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const setPostAuthor = name => {
    return {type: SET_POST_AUTHOR, payload: name}
}

export const getPostAuthor = id => {
    return (dispatch) => {
        return axios(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(data => {
                dispatch(setPostAuthor(data.data.username))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const setPostComments = comments => {
    return {type: SET_POST_COMMENTS, payload: comments}
}

export const getPostComments = postId => {
    return (dispatch) => {
        return axios(`https://jsonplaceholder.typicode.com/comments`)
            .then(data => {
                const arr = data.data;
                const res = arr.filter(comment => {
                    //Проверка комментариев к посту
                    if(comment.postId === postId){
                        return comment;
                    }else{
                        return null;
                    }
                })
                dispatch(setPostComments(res));
            })
            .catch(error => {
                console.log(error);
            })
    }
}





