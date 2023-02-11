import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers';
import { AuthState } from './slice/authSlice';

type ImmutableCheck = { warnAfter: number };
type GetDefaultMiddlewareFn = (arg0: { immutableCheck: ImmutableCheck }) => any;

interface Action {
    type: string;
    payload: AuthState;
}

const localStorageMiddleware = ({ getState }: any) => {
    return (next: (arg0: any) => any) => (action: Action) => {
        const result = next(action);
        localStorage.setItem('auth', JSON.stringify(getState()));
        return result;
    };
};

const reHydrateStore = () => {
    if (localStorage.getItem('auth') !== null) {
        return JSON.parse(localStorage.getItem('auth') || 'null');
    }
};

export const store = configureStore({
    reducer: {
        data: rootReducer
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware: GetDefaultMiddlewareFn) => [
        ...getDefaultMiddleware({
            immutableCheck: { warnAfter: 200 }
        }).concat(localStorageMiddleware),
    ]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
