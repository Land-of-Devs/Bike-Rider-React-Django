import * as api from './api';

export async function myTravels() {
    return (await api.get('/travels/my-travels/')).data;
}
