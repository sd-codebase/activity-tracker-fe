const host = 'http://localhost:8080/api';
// const host = 'https://sdatservices.onrender.com/api';
export function url(url) {
    return `${host}/${url}`;
}