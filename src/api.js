// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost/the2px/wp-json/the2px/v1/';

export const fetchSvgImages = async () => {
    const response = await axios.get(`${API_BASE_URL}svg-images`);
    return response.data;
};
