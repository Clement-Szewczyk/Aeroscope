import axios from "axios";

const aicraftApi = axios.create({
    baseURL: 'http://127.0.0.1:5000', // Base URL de l'API Flask
    timeout: 5000,
})

export default aicraftApi;
