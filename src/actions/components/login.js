import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESSFUL, 
    LOGIN_FAIL 
} from '../../actions/actionTypes';

import { loginCall } from '../../client/client';

export const login = (username, password) => {
    const loginRequest = () => {
        return {
            type: LOGIN_REQUEST
        }
    }

    const loginSuccessfull = (access_token) => {
        return {
            type: LOGIN_SUCCESSFUL,
            payload: {
                access_token
            }
        }
    }

    const loginFail = (error) => {
        return {
            type: LOGIN_FAIL,
            payload: {
                error
            }
        }
    }

    return dispatch => {
        dispatch(loginRequest());
        return loginCall(username, password)
            .then(res => {
                return res.json();  
            })
            .then(res => {
                if(!res.access_token) {
                    dispatch(loginFail(res.message))
                    //return Promise.resolve(res.access_token);
                } else {
                    dispatch(loginSuccessfull(res.access_token));
                }
            })
            .catch(err => {
                dispatch(loginFail(err));
                //return Promise.reject();
            })
    }
}