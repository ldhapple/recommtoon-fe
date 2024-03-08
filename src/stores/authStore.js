import {reactive, readonly} from "vue";
import axios from "axios";

const state = reactive({
    accessToken: null,
    username: null,
    isAuthenticated: false,
});

const setAuth = (token, username) => {
    state.accessToken = token;
    state.username = username;
    state.isAuthenticated = !!token;
};

const clearAuth = () => {
    state.accessToken = null;
    state.username = null;
    state.isAuthenticated = false;
};

const refreshToken = async () => {
    try {
        const response = await axios.post('/api/auth/refresh');
        const {accessToken} = response.data;

        setAuth(accessToken, undefined);
        return accessToken;
    } catch (error) {
        console.error("토큰 갱신 실패", error);
        clearAuth();
        throw error;
    }
};

export default function useAuthStore() {
    return {
        state: readonly(state),
        setAuth,
        clearAuth,
        refreshToken,
    };
}