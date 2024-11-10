// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeasonListing from '../pages/seasonListing/SeasonListing';
import RacesForSeason from '../pages/racesForSeason/RacesForSeason';
import RaceDetails from '../pages/raceDetails/RaceDetails';
import NotFound from '../pages/NotFound';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<SeasonListing />} />
            <Route path="/season/:seasonId" element={<RacesForSeason />} />
            <Route path="/season/race/:seasonId/:round" element={<RaceDetails />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
    );
};

export default AppRoutes;
