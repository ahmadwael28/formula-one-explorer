// src/api/api.ts
import axios from 'axios';

// Create an Axios instance with the Ergast API base URL
const api = axios.create({
    baseURL: 'https://ergast.com', // Ergast API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to fetch seasons data from the Ergast API
export const fetchSeasons = () => {
    return api.get('/api/f1/seasons.json')
        .then(response => response.data.MRData.SeasonTable.Seasons);
};

export default api;
