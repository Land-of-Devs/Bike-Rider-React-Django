import * as api from './api';

export async function clientStations() {
    return await api.get('/stations/client');
}

export async function maintenanceStations() {
    return await api.get('/stations/maintenance');
}

export async function configure(token) {
    return await api.post('/stations/configure', token);
}