import {
    GET_NEWS_REQUEST,
    GET_NEWS_ERROR,
    GET_NEWS_SUCCESS,
    AUTO_SEARCH_REQUEST,
    AUTO_SEARCH_SUCCESS,
    AUTO_SEARCH_ERROR,
    GET_FAVORITES_REQUEST,
    GET_FAVORITES_SUCCESS,
    GET_FAVORITES_ERROR,
    GET_CHART_DATA,
    FILTER_DATA,
    ADD_TO_FAVORITES_REQUEST,
    ADD_TO_FAVORITES_SUCCESS,
    ADD_TO_FAVORITES_ERROR
} from "../actions/actionTypes";

const initialState = {
    dataLoading: false,
    data: [],
    dataError: '',
    filteredData: [],
    newsLoading: false,
    news: [],
    newsError: '',
    chartData: [],
    favoritesLoading: false,
    favorites: [],
    favoritesError: '',
};

const filterData = (data, currency) => {
    const newData = [];

    if(currency.length === 0) {
        return newData;
    }

    data.map(val => {
        const { name } = val.baseInstrument;

        if(name && name.toLowerCase().indexOf(currency.toLowerCase()) > -1) {
            newData.push(val);
        }
    })

    return newData;
}

export default (state = initialState, action) => {
    switch(action.type) {
        case AUTO_SEARCH_REQUEST:
            return {
                ...state,
                dataLoading: true,
            }
        case AUTO_SEARCH_SUCCESS:
            return {
                ...state,
                dataLoading: false,
                data: action.payload.currencies,
            }
        case AUTO_SEARCH_ERROR:
            return {
                ...state,
                dataError: action.payload.dataError
            }
        case FILTER_DATA:
            return {
                ...state,
                filteredData: filterData(state.data, action.payload.currency)
            }
        case GET_NEWS_REQUEST:
            return {
                ...state,
                newsLoading: true,
                newsError: '',
            }
        case GET_NEWS_SUCCESS:
            return {
                ...state,
                news: action.payload.news,
                newsLoading: false,
                newsError: ''
            }
        case GET_NEWS_ERROR:
            return {
                ...state,
                newsError: action.payload.newsError,
                newsLoading: false,
            }   
        case GET_CHART_DATA:
            return {
                ...state,
                chartData: action.payload.chartData
            }
        case GET_FAVORITES_REQUEST:
            return {
                ...state,
                favoritesLoading: true,
                favoritesError: ''
            } 
        case GET_FAVORITES_SUCCESS:
            return {
                ...state,
                favoritesLoading: false,
                favorites: action.payload.favorites
            }
        case GET_FAVORITES_ERROR:
            return {
                ...state,
                favoritesLoading: false,
                favoritesError: action.payload.favoritesError
            }
        case ADD_TO_FAVORITES_REQUEST:
            return {
                ...state,
            }
        case ADD_TO_FAVORITES_SUCCESS:
            return {
                ...state
            }
        case ADD_TO_FAVORITES_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}