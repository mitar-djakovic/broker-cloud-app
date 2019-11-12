import {
    SEARCH_REQUEST,
    SEARCH_SUCCESSFUL,
    SEARCH_FAIL,
    AUTO_SEARCH
} from "../actions/actionTypes";

const initialState = {
    data: [],
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case AUTO_SEARCH:
            return {
                data: action.payload.currencies,
                error: null
            }
        case SEARCH_REQUEST:
            return {
                data: [],
                error: null
            }
        case SEARCH_SUCCESSFUL:
            return {
                data: action.payload.currencies,
                error: null
            }
        case SEARCH_FAIL:
            return {
                data: [],
                error: action.payload.error
            }
        default:
            return state;
    }
}