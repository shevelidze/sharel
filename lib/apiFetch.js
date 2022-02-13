function logOut() {

}

async function apiFetch(resource, bodyObject, JWTRequired = true) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    if (JWTRequired) {
        let accessToken = localStorage.getItem('JWTAccessToken');
        if (!accessToken) {
            logOut();
            throw new Error('Empty JWT access token.');
        } else {
            headers.append('Authorization', 'Bearer ' + accessToken);
        }
    }
    return await fetch('/api' + resource, { method: 'POST', headers, body: JSON.stringify(bodyObject) });
}

export { logOut, apiFetch }