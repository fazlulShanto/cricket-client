import axios from "axios";
import { baseURL } from "./domain";

const AxiosInstance = axios.create({
    baseURL:baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default AxiosInstance;
