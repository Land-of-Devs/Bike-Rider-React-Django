import * as api from './api';

export async function myReservation() {
    return await api.get('/booking');
}

export async function create(station) {
    return await api.post('/booking', station);
}

export async function cancel(){
    return await api.del('/booking');
}