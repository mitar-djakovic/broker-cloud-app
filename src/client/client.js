const url = 'https://api.staging.brokercloud.io/v1';
const client_id = '844b0a54-c0af-11e7-abc4-cec278b6b50a';
const applicationId = '345070b3-722f-4fd8-8940-5286c15b53df';

const transformData = (data) => {
    return Object.keys(data).reduce((acc, currentKey) => {
        return `${acc}${acc.length > 0 ? "&": ""}${currentKey}=${data[currentKey]}`; 
    }, "");
}

export const loginCall = (username, password) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const data = {
        username,
        password,
        client_id,
        grant_type: 'password'
    };

    return fetch(`${url}/oauth/token`, {
        method: 'post',
        body: transformData(data),
        headers
    });
};

export const autoSearchCall = async (access_token) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', `Bearer ${access_token}`);

    const userInfo = await fetch(`${url}/users/me`, { headers })
        .then(res => res.json());
    
    const id = userInfo.id;

    const markets = await fetch(`${url}/users/${id}/symbols`, { headers })
        .then(res => res.json())

    return markets;
};

// export const currecnyCall = async (access_token, currecyId) => {
//     const headers = new Headers();
//     headers.append('Authorization', `Bearer ${access_token}`);

//     const userInfo = await fetch(`${url}/users/me`, { headers })
//         .then(res => res.json());

//     const currecy = await fetch(`${url}/users/${userInfo.id}/symbols/${currecyId}`, { headers });
//     console.log('Currency ===>', currecy)
//     return currecy;
// }; 

export const getFavoritesCall = async (access_token) => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${access_token}`);
    headers.append('Content-Type', 'application/json');

    const userInfo = await fetch(`${url}/users/me`, { headers })
        .then(res => res.json());

    const id = userInfo.accounts[0].id;
    
    const favorites = await fetch(`${url}/accounts/${id}/watchlist`, { headers })
        .then((res => res.json()))
    
    return favorites;
};

export const followUnfollowFavoriteCall = async (access_token, symbolId, followStatus) => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${access_token}`);
    headers.append('Content-Type', 'application/json');

    const userInfo = await fetch(`${url}/users/me`, { headers })
        .then(res => res.json());

    const id = userInfo.accounts[0].id;
    
    const symbol = await fetch(`${url}/accounts/${id}/watchlist/${symbolId}`, { 
        headers,
        method: 'PUT',
        body: JSON.stringify({
            following: followStatus
        })
    });
    
    return symbol;
};

export const getChartCall = async (access_token, symbolId) => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${access_token}`);

    const userInfo = await fetch(`${url}/users/me`, { headers })
        .then(res => res.json());

    const id = userInfo.id;

    const chart = await fetch(`${url}/users/${id}/symbols/${symbolId}/chart`, { headers })
        .then(res => res.json());
    return chart;
};

export const getNewsCall = async (access_token) => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${access_token}`);

    const news = await fetch(`${url}/applications/${applicationId}/news/coinpulse`, { headers })
        .then(res => res.json());
    
    return news;
}