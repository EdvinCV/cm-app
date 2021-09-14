import axios from 'axios';

// Configuracion de cliente axios
export const clientToken = axios.create({
    baseURL: 'http://67.205.180.171:3001/',
    headers: {'Authorization': 'Token ' + localStorage.getItem("access_token")}
});

export const client = axios.create({
    baseURL: 'http://67.205.180.171:3001/',
});
