import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://opensky-network.org/api',
    timeout: 10000,
})

export default apiClient;