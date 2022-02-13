import * as api from './api';

export async function login(form) {
    return (await api.post('/auth/login/', form)).data;
}

export async function refreshSession() {
    return (await api.post('/auth/login/refresh/')).data;
}

export async function logout() {
    return (await api.post('/auth/logout/')).data;
}

export async function register(form) {
    return (await api.post('/auth/register/', form)).data;
}