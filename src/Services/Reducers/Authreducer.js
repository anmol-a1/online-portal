import {
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT_USER
} from '../Constants';

const initialState = {
    isAuthenticated: null,
    user: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_USER:
            return {
                ...initialState
            }
        case USER_LOADED_SUCCESS:
            console.log(payload);
            console.log(payload);
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            console.log(payload);

            return {
                ...state,
                user: null
            }
        default:
            return state
    }
};
