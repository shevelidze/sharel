function logOut() {
    localStorage.removeItem('JWTAccessToken');
    location.assign('/');
}

async function refreshToken(token) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'Bearer ' + token);
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
        return true;
    } else {
        console.debug('Failed to refresh token.');
        logOut();
        return false;
    }
}

async function apiFetch(resource, bodyObject, JWTRequired = true) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    let accessToken;

    if (JWTRequired) {
        accessToken = localStorage.getItem('JWTAccessToken');

        if (!accessToken) {
            logOut();
            throw new Error('Empty JWT access token.');
        } else {
            headers.append('Authorization', 'Bearer ' + accessToken);
        }
    }

    let response = await fetch('/api' + resource, {
        method: 'POST',
        headers,
        body: JSON.stringify(bodyObject),
    });

    if (JWTRequired && response.status === 400) {
        const responseBodyJSON = await response.json();
        if (
            (responseBodyJSON.errors?.includes('InvalidJWTToken') ||
                responseBodyJSON.errors?.includes('ExpiredJWTToken')) &&
            (await refreshToken(accessToken))
        ) {
            response = apiFetch(resource, bodyObject, JWTRequired);
        }
    }

    return response;
}

export { logOut, apiFetch };
