import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESSFUL, 
    LOGIN_FAIL 
} from '../actions/actionTypes';

const initialState = {
    logged: false,
    access_token: null,
    error: false,
    errorMsg: '',
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                logged: false,
                access_token: null,
                error: null,
                errorMsg: '',
                loading: true,
            }
        case LOGIN_SUCCESSFUL:
            return {
                logged: true,
                access_token: action.payload.access_token,
                error: false,
                errorMsg: '',
                loading: false
            }
        case LOGIN_FAIL:
            return {
                logged: false,
                access_token: null,
                error: true,
                errorMsg: action.payload.error,
                loading: false
            }
        default:
            return state;
    }
}