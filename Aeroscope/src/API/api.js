import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://opensky-network.org/api',
    timeout: 1000,
})

export default apiClient;