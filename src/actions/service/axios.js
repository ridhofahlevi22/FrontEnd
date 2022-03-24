import Axios from 'axios';
require('dotenv').config();
const dotenv=require('dotenv');
export const service = Axios.create({ 
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        // 'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
        // 'Authorization': 'c88ebf0bf801ae7b36bd820cb805dbd6c42fc5d5'
    }
});