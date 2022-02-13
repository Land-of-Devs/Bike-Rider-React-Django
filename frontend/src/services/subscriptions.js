import * as api from './api';

export async function list() {
    return (await api.get('/subscriptions/list')).data;
}

export async function change(sub) {
    return (await api.put('/subscriptions/change', sub)).data;
}