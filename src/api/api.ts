import { mustLoginPages } from "@/constant/url";
import axios from "axios";
import storeUser from "../store/storeUser";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Authorization: `Bearer ${storeUser.get('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    config => {
        const token = storeUser.get('token');
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if (error.response.status === 401) {
            if (mustLoginPages.some((el: any) => error.config.url.includes(el))) {
                // const router = useRouter();
                // sendToLogin(router)
                storeUser.set('token', '')
                storeUser.set('me', '')
                window.location.href = '/'
            }
            // storeUser.set('token', '')
            // storeUser.set('me', '')
            // window.location.href = '/'
            return axios(error.config);
        } else {
            return Promise.reject(error);
        }
    }
);



export default api