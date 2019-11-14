import {
    AUTO_SEARCH,
    GET_FAVORITES,
    GET_CHART_DATA
} from '../actionTypes';

import { autoSearchCall, getFavoritesCall, getChartCall } from '../../client/client';

export const autoSearch = (access_token) => {
    const autoSearchRequest = (currencies) => {
        return {
            type: AUTO_SEARCH,
            payload: {
                currencies
            }
        }
    }

    return dispatch => {
        autoSearchCall(access_token)
            .then(res => {
                dispatch(autoSearchRequest(res));
            });
    }
};

export const getFavorites = (access_token) => {
    console.log('accesTOKEN', access_token);

    const autoGetFavorites = (favorites) => {
        return {
            type: GET_FAVORITES,
            payload: {
                favorites
            }
        }
    }

    return dispatch => {
        getFavoritesCall(access_token).then(res => {
            console.log('RES ===>', res)
        })
    }
};

export const getChart = (access_token, id) => {
    const getChartData = (chartData) => {
        return {
            type: GET_CHART_DATA,
            payload: {
                chartData
            }
        }
    }
    return dispatch => {
        getChartCall(access_token, id)
            .then(res => {
                dispatch(getChartData(res));
            })
    }
}