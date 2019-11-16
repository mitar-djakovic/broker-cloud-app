import {
    GET_NEWS_REQUEST,
    GET_NEWS_ERROR,
    GET_NEWS_SUCCESS,
    GET_FAVORITES_REQUEST,
    GET_FAVORITES_SUCCESS,
    GET_FAVORITES_ERROR,
    AUTO_SEARCH_REQUEST,
    AUTO_SEARCH_SUCCESS,
    AUTO_SEARCH_ERROR,
    FILTER_DATA,
    GET_CHART_DATA,
    FOLLOW_UNFOLLOW_REQUEST,
    FOLLOW_UNFOLLOW_SUCCESS,
    FOLLOW_UNFOLLOW_ERROR
} from '../actionTypes';

import { 
    autoSearchCall, 
    getFavoritesCall, 
    getChartCall, 
    getNewsCall,
    followUnfollowFavoriteCall 
} from '../../client/client';

export const autoSearch = (access_token) => {
    const autoSearchRequest = () => {
        return {
            type: AUTO_SEARCH_REQUEST,
        }
    }

    const autoSearchSuccess = (currencies) => {
        return {
            type: AUTO_SEARCH_SUCCESS,
            payload: {
                currencies
            }
        }
    }

    const autoSearchError = (dataError) => {
        return {
            type: AUTO_SEARCH_ERROR,
            dataError
        }
    }

    return dispatch => {
        dispatch(autoSearchRequest());

        autoSearchCall(access_token)
            .then(res => {
                if (res.length) {
                    dispatch(autoSearchSuccess(res));
                } else {
                    dispatch(autoSearchError(res.message));
                }
            });
    }
};

export const getFavorites = (access_token) => {
    console.log('GET FFAVORITES', access_token);

    const getFavoritesRequest = () => {
        return {
            type: GET_FAVORITES_REQUEST,
        }
    };

    const getFavoritesSucces = (favorites) => {
        return {
            type: GET_FAVORITES_SUCCESS,
            payload: {
                favorites
            }
        }
    };

    const getFavoritesError = (favoritesError) => {
        return {
            type: GET_FAVORITES_ERROR,
            payload: {
                favoritesError
            }
        }
    }

    return dispatch => {
        dispatch(getFavoritesRequest());

        getFavoritesCall(access_token).then(res => {
            console.log('####', res);
            if (res.length >= 0) {
                dispatch(getFavoritesSucces(res));
            } else {
                dispatch(getFavoritesError(res))
            }
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
                console.log('CHART +++', res);
                dispatch(getChartData(res));
            })
    }
}

export const filterData = (currency) => {
    const filterAction = (currency) => {
        return {
            type: FILTER_DATA,
            payload: {
                currency
            } 
        }
    }

    return dispatch => {
        dispatch(filterAction(currency))
    }
};

export const getNews = (access_token) => {
    const getNewsRequest = () => {
        return {
            type: GET_NEWS_REQUEST,
        }
    };

    const getNewsSuccess = (news) => {
        return {
            type: GET_NEWS_SUCCESS,
            payload: {
                news
            }
        }
    };

    const getNewsError = (newsError) => {
        return {
            type: GET_NEWS_ERROR,
            payload: {
                newsError
            }
        }
    };

    return dispatch => {
        dispatch(getNewsRequest());

        getNewsCall(access_token)
            .then(res => {
                // Stalno sam dobijao error '500', tako da vise nisam 
                // mogao da odradim za deo sa dobijanjem vesti.
                if(res.code !== 200) {
                    dispatch(getNewsError(res.message));
                } else {
                    dispatch(getNewsSuccess(res));
                }
            });
    }
};

export const addFavorites = (access_token, symbolId, followStatus) => {
    console.log("ID", symbolId);
    const followUnfollowRequest = () => {
        return {
            type: FOLLOW_UNFOLLOW_REQUEST
        }
    };

    const followUnfollowSuccess = (favoriteStatus) => {
        return {
            type: FOLLOW_UNFOLLOW_SUCCESS,
            payload: {
                favoriteStatus
            }
        }
    };

    const followUnfollowError = (favoriteError) => {
        return {
            type: FOLLOW_UNFOLLOW_SUCCESS,
            payload: {
                favoriteError
            }
        }
    }
    return dispatch => {
        dispatch(followUnfollowRequest());
        
        followUnfollowFavoriteCall(access_token, symbolId, followStatus).then(res => {
            if(res.status == 200 && followStatus === true) {
                dispatch(followUnfollowSuccess('Currency added to favorites'));
            } else if (res.status === 200 && followStatus === false) {
                dispatch(followUnfollowSuccess('Currency is removed from favorites'));
            } else {
                dispatch(followUnfollowError())
            }
        })
    }
}