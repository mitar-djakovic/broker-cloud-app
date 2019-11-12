const url = 'https://api.staging.brokercloud.io/v1';
const client_id = '844b0a54-c0af-11e7-abc4-cec278b6b50a';

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

    const markets = await fetch(`${url}/users/${userInfo.id}/markets-search`, { headers })
        .then(res => res.json())

    return markets;
};

export const currecnyCall = async (access_token, currecyId) => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${access_token}`);

    const userInfo = await fetch(`${url}/users/me`, { headers })
        .then(res => res.json());

    const currecy = await fetch(`${url}/users/${userInfo.id}/markets/${currecyId}`);
    return currecy;
}; 