import axios from 'axios';

// Configuracion de cliente axios
export const clientToken = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {'Authorization': localStorage.getItem("access_token")}
});

export const client = axios.create({
    baseURL: 'http://localhost:3001/',
});
