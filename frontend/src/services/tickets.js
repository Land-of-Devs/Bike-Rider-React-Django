import * as api from './api';

export async function list() {
    return (await api.get('/tickets/list/')).data;
}

export async function create(form) {
    return (await api.post('/tickets/user/', form)).data;
}

export async function status(ticket, status) {
    return (await api.put('/tickets/status/' + ticket + '/', status)).data;
}

export async function response(receiver, subject, message) {
    return (await api.post('/tickets/email/', {receiver, subject, message})).data;
}