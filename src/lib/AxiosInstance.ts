import axios from "axios";
// import { currentBaseURL } from "./domain";

const AxiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default AxiosInstance;
