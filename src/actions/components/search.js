import {
    SEARCH_REQUEST,
    SEARCH_SUCCESSFUL,
    SEARCH_FAIL,
    AUTO_SEARCH
} from '../actionTypes';

import { autoSearchCall } from '../../client/client';

export const search = () => {
    const searchRequest = () => {
        return {
            type: SEARCH_REQUEST
        }
    }

    const seaarchSuccessful = () => {
        return {
            type: SEARCH_SUCCESSFUL
        }
    }

    const searchFail = () => {
        return {
            type: SEARCH_FAIL
        }
    }

    return dispatch => {
        
    }
}

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
            // .then(res => {
            //     //console.log(res);
            //     dispatch(autoSearchRequest(
            //         Object.keys(res).reduce((acc, currentCurr) => {
            //             const currencys = res[currentCurr];
            //             return acc.concat(currencys
            //                 .map(currency => ({
            //                     name: currency.name
            //                 }))
            //             );
            //         }, [])
            //     ))
            // })
            .then(res => {
                dispatch(autoSearchRequest(res))
            })
    }
}