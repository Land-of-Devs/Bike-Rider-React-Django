import * as api from './api';

export async function clientStations(lat, lon) {
    return (await api.get('/stations/client/', lat + lon ? {lat, lon} : {})).data;
}

export async function maintenanceStations() {
    return (await api.get('/stations/maintenance/')).data;
}

export async function configure(token) {
    return (await api.post('/stations/configure/', {token})).data;
}
