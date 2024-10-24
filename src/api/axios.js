import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kolfipi.mnz.dom.my.id//api', // Cambia esto por la URL de tu API
});

export default instance;
