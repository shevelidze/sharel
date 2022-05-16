function logOut() {
    localStorage.removeItem('JWTAccessToken');
    location.assign('/');
}

let tokenRefreshingPromise = null;

async function refreshToken(token, logOutOnFail = true) {
    if (tokenRefreshingPromise) {
        return await tokenRefreshingPromise;
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'Bearer ' + token);

    tokenRefreshingPromise = new Promise(async (resolve) => {
        let response = await fetch('/api/refresh_session', {
            method: 'POST',
            headers,
        });
        if (response.ok) {
            localStorage.setItem(
                'JWTAccessToken',
                (await response.json()).JWTAccessToken
            );
            console.debug('Token has successfully refreshed.');
            resolve(true);
        } else {
            console.debug('Failed to refresh token.');
            if (logOutOnFail) logOut();
            resolve(false);
        }
    });

    const result = await tokenRefreshingPromise;
    tokenRefreshingPromise = null;
    return result;
}

async function apiFetch(resource, bodyObject, JWTRequired = true) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    let response, responseBodyObject, accessToken;

    async function makeRequest() {
        if (JWTRequired) {
            accessToken = localStorage.getItem('JWTAccessToken');
            headers.set('Authorization', 'Bearer ' + accessToken);
        }
        response = await fetch('/api' + resource, {
            method: 'POST',
            headers,
            body: JSON.stringify(bodyObject),
        });
    }

    await makeRequest();

    if (JWTRequired) {
        let attemps = 0,
            attempsLimit = 3;
        while (
            response.status === 400 &&
            attemps < attempsLimit &&
            ((responseBodyObject = await response.json())?.errors.includes(
                'InvalidJWTToken'
            ) ||
                responseBodyObject?.errors.includes('ExpiredJWTToken'))
        ) {
            await refreshToken(accessToken, attemps == attempsLimit - 1);
            await makeRequest();
            attemps++;
        }
    }

    return response;
}

export { logOut, apiFetch };
