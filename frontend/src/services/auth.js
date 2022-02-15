import * as api from './api';

export async function login(form, params) {
    return (await api.post('/auth/login/', form, params)).data;
}

export async function refreshSession(params) {
    return (await api.post('/auth/login/refresh/', null , params)).data;
}

export async function logout() {
    return (await api.post('/auth/logout/')).data;
}

export async function register(form) {
    return (await api.post('/auth/register/', form)).data;
}