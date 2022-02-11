import * as api from './api';

export async function use(coupon) {
    return (await api.post('/coupons/use/', {coupon})).data;
}
