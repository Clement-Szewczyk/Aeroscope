import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://opensky-network.org/api',
    timeout: 5000,
})

export default apiClient;