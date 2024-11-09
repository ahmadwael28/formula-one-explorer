// src/api/api.ts
import axios from 'axios';

// Create an Axios instance with the Ergast API base URL
const api = axios.create({
    baseURL: 'https://ergast.com', // Ergast API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to fetch seasons data with pagination from the Ergast API
export const fetchSeasons = (limit = 10, offset = 0) => {
    return api.get(`/api/f1/seasons.json`, { params: { limit, offset } })
        .then(response => ({
            seasons: response.data.MRData.SeasonTable.Seasons,
            total: parseInt(response.data.MRData.total, 10),
        }));
};

// Function to fetch races for a specific season
export const fetchRacesForSeason = (season: string, limit = 10, offset = 0) => {
    return api.get(`/api/f1/${season}/races.json`, { params: { limit, offset } })
        .then(response => ({
            races: response.data.MRData.RaceTable.Races,
            total: parseInt(response.data.MRData.total, 10),
        }));
};

export default api;
