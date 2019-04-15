import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.1.28:3000' //em dev endereco do localhost via genimotion// ou use o endereco IP da sua maquina dentro da rede para devices
});

export default api;