import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080/',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
