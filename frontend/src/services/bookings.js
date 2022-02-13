import * as api from './api';

export async function myReservation() {
    return (await api.get('/bookings/')).data;
}

export async function create(station) {
    return (await api.post('/bookings/', station)).data;
}

export async function cancel(){
    return (await api.del('/bookings/')).data;
}