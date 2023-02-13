// import axios, { AxiosRequestConfig } from 'axios';

// export interface Response {
//     $id: string;
//     token: string;
//     refreshToken: string;
// }

// interface Auth {
//     isLoggedIn: boolean;
//     token: string;
//     refreshToken: string;
// }

// interface Token {
//     data: {
//         auth: Auth;
//         user: User;
//     };
// }

// const api = axios.create({
//     baseURL: 'https://localhost:44346/api/v1/'
// });

// api.interceptors.request.use(
//     (config: AxiosRequestConfig): AxiosRequestConfig => {
//         if (!config) throw new Error(`Expected 'config' not to be undefined`);
//         if (!config?.headers) throw new Error(`Expected 'config.headers' not to be undefined`);
//         const newHeader = { ...config.headers, ...authHeader() };
//         config.headers = newHeader;
//         return config;
//     },
//     (error) => {
//         throw new Error('Heder error' + error);
//     }
// );

// const refreshAuthLogic = async (failedRequest: any): Promise<void> => {
//     try {
//         const auth: Token = JSON.parse(localStorage.getItem('auth') || 'false');
//         const response = await api.post<Response>('auth/RefreshToken/', {
//             token: auth.data.auth.token,
//             refreshToken: auth.data.auth.refreshToken
//         });

//         const { token, refreshToken } = response.data;
//         if (!(token.length !== 0 || refreshToken.length !== 0)) throw Error('no token found');
//         auth.data.auth.refreshToken = refreshToken;
//         auth.data.auth.token = token;
//         store.dispatch(changeRefreshToken({ token, refreshToken }));
//         localStorage.setItem('auth', JSON.stringify(auth));
//     } catch (error) {
//         localStorage.clear();
//         throw error;
//     }
// };

// createAuthRefreshInterceptor(api, refreshAuthLogic);

// export default api;
