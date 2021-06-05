// import action types

import {
    CURRENT_USER,
    DELETE_USER,
    FAIL_USER,
    FOLLOW_USER,
    GET_ONE_USER,
    GET_USERS,
    LOAD_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    SEARCH_USERS,
    UNFOLLOW_USER,
    UPDATE_USER,
} from "../constantes/user";

//initialstate
const initialstate = {
    user: {},
    otherUser: {},
    users: [],
    results: [],
    errors: null,
    isAuth: false,
    load: false,
};

// pure function (state, action{type, payload})
const userReducer = (state = initialstate, { type, payload }) => {
    switch (type) {
        case LOAD_USER:
            return { ...state, load: true };
        case REGISTER_USER:
            localStorage.setItem("token", payload.token);
            return { ...state, user: payload.user, load: false, isAuth: true };
        case LOGIN_USER:
            localStorage.setItem("token", payload.token);
            return { ...state, user: payload.user, load: false, isAuth: true };
        case FAIL_USER:
            return { ...state, errors: payload, load: false };
        case CURRENT_USER:
            return { ...state, user: payload.user, isAuth: true };
        case GET_ONE_USER:
            return { ...state, otherUser: payload.user, load: false };
        case GET_USERS:
            return { ...state, users: payload.users, load: false };
        case SEARCH_USERS:
            return { ...state, results: payload, load: false };
        case FOLLOW_USER:
            return { ...state, otherUser: payload.user };
        case UNFOLLOW_USER:
            return { ...state, otherUser: payload.user };
        case UPDATE_USER:
            return { ...state, user: payload.user };
        case DELETE_USER:
            return { ...state, otherUser: payload.user };
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return { ...state, user: {}, isAuth: false };

        default:
            return state;
    }
};

export default userReducer;
