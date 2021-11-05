import axios from "axios";

export const api = axios.create({
    baseURL: "http://172.18.0.120:3333",
});

export default api;