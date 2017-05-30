export function saveSession(token) {
    try {
        localStorage.setItem('session', JSON.stringify(token));
    } catch (err) {
        console.error(err);
    }
}

export function extractSession() {
    try {
        return localStorage.getItem('session');
    } catch (err) {
        console.error(err);
    }
    return null;
}

export function clearSession() {
    try {
        localStorage.setItem('session', '');
    } catch (err) {
        console.error(err);
    }
}
