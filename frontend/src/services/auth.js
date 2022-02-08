import * as api from './api';

export async function login(form) {
    return await api.post('/auth/login/', form);
}

export async function refreshSession() {
    return await api.get('/auth/login/refresh/');
}

export async function logout() {
    return await api.post('/auth/logout/');
}

export async function register(form) {
    return await api.post('/auth/register/', form);
}