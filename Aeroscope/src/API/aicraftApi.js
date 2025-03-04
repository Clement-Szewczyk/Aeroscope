import axios from "axios";

const aicraftApi = axios.create({
    baseURL: 'https://aeroscopeapi-b8cpbnbabsakg5ex.francecentral-01.azurewebsites.net/', // Base URL de l'API Flask
    timeout: 5000,
})

export default aicraftApi;
