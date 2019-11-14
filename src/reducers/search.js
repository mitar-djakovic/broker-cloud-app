import {
    GET_FAVORITES,
    AUTO_SEARCH,
    GET_CHART_DATA
} from "../actions/actionTypes";

const initialState = {
    data: [],
    favorites: [],
    chartData: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case AUTO_SEARCH:
            return {
                ...state,
                data: action.payload.currencies,
            }
        case GET_FAVORITES:
            return {
                ...state,
                favorites: action.payload.favorites
            }
        case GET_CHART_DATA:
            return {
                ...state,
                chartData: action.payload.chartData
            }
        default:
            return state;
    }
}