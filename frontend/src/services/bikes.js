import * as api from './api';

export async function hook(bike) {
    return (await api.put('/bikes/hook/' + bike + '/')).data;
}

export async function unhook(bike) {
    return (await api.put('/bikes/unhook/' + bike + '/')).data;
}

export async function status(bike, status) {
    return (await api.put('/bikes/status/' + bike + '/', status)).data;
}

export async function listOnRoad() {
    return (await api.get('/bikes/on-road/')).data;
}