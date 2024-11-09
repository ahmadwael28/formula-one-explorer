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

// Function to fetch all races for a specific season
export const fetchRacesForSeason = (season: string) => {
    return api.get(`/api/f1/${season}/races.json`)
        .then(response => ({
            races: response.data.MRData.RaceTable.Races,
        }));
};

// Function to fetch race results for a specific season and round
export const fetchRaceResults = (season: string, round: string) => {
    return api.get(`/api/f1/${season}/${round}/results.json`)
        .then(response => response.data.MRData.RaceTable.Races[0].Results);
};

export default api;
