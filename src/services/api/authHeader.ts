import { store } from '../../redux/store';

export default function authHeader(): {} | { Authorization: string } | { Authorization?: undefined } {
    const token = store.getState().data.auth?.token;

    if (token?.length !== 0) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}
