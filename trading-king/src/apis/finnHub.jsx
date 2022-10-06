import axios from 'axios';

const TOKEN = 'ccv5heaad3iaeesdgdj0ccv5heaad3iaeesdgdjg';
export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: TOKEN
  }
});