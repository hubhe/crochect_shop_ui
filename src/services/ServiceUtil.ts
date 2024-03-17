import axios, { AxiosError } from 'axios';

const serverFetch = axios.create({
    baseURL: 'http://localhost:3000/'
})
const userFetch = axios.create({
    baseURL: 'http://localhost:3000/'
})

userFetch.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}` || "";
        config.headers['refresh_token'] = localStorage.getItem('refreshToken') || "";
        return config
    },
    error => {
        return Promise.reject(error);
    },
)

userFetch.interceptors.response.use(
    res => res,
    async error => {
        if (error.response.status === 401 && error.config.url !== '/auth/refresh') {
            const res = await userFetch.get('/auth/refresh')
            console.log("REFRESH WORKED!!!")
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('accessToken', res.data.accessToken);
            return await userFetch(error.config)  // retry failed request
        } 
        if (error.response.status === 401 && error.config.url === '/auth/refresh') {
            // if refresh returned 401, logout and return to home page
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            window.location.href = '/'
        }
        return Promise.reject(error);
    },
)

export {
    serverFetch, 
    userFetch
}