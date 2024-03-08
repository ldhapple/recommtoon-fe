import axios from "axios";
import useAuthStore from "@/stores/authStore";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const{state} = useAuthStore();
        const token = state.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retries) {
            originalRequest._retries = true;

            try {
                const accessToken = await useAuthStore().refreshToken();
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                console.log("Access 토큰 갱신");
                return axios(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;