import * as api from './api';

export async function list() {
    return await api.get('/tickets/list');
}

export async function create(form) {
    return await api.post('/tickets/user', form);
}

export async function status(ticket, status) {
    return await api.put('/tickets/status/' + ticket, status);
}

export async function response(email) {
    return await api.post('/tickets/email', email);
}