import * as api from './api';

export async function hook(bike) {
    return await api.put('/bikes/hook/'+bike);
}

export async function unhook(bike) {
    return await api.put('/bikes/unhook/'+bike);
}

export async function status(bike,status) {
    return await api.put('/bikes/status/'+bike, status);
}

export async function listOnRoad() {
    return await api.get('/bikes/on-road');
}