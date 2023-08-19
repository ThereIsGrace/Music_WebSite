const { default: axios } = require("axios");
const { SERVER_URL } = require("./constants");

const TOKEN = localStorage.getItem('Authorization');
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN
    }
});
