// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeasonListing from '../pages/SeasonListing';
import RacesForSeason from '../pages/RacesForSeason';
import RaceDetails from '../pages/RaceDetails';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<SeasonListing />} />
            <Route path="/season/:seasonId" element={<RacesForSeason />} />
            <Route path="/season/race/:seasonId/:round" element={<RaceDetails />} />
        </Routes>
    );
};

export default AppRoutes;
