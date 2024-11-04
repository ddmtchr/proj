import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};

export const register = async (username, password, role) => {
    const response = await axios.post(`${API_URL}/register`, { username, password, role });
    return response.data;
};

export const logout = () => {
    removeToken();
};

export const saveToken = (token) => {
    localStorage.setItem("jwt", token);
};

export const getToken = () => {
    return localStorage.getItem("jwt");
};

export const removeToken = () => {
    localStorage.removeItem("jwt");
};
