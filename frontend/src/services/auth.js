import * as api from './api';

export async function login(form) {
    return (await api.post('/auth/login/?origin=web', form)).data;
}

export async function loginStation(form) {
    return (await api.post('/auth/login/?origin=station', form)).data;
}

export async function refreshSession() {
    return (await api.post('/auth/login/refresh/?origin=web')).data;
}

export async function refreshSessionStation() {
    return (await api.post('/auth/login/refresh/?origin=station')).data;
}

export async function logout() {
    return (await api.post('/auth/logout/')).data;
}

export async function register(form) {
    return (await api.post('/auth/register/', form)).data;
}