// src/pages/RacesForSeason.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const RacesForSeason: React.FC = () => {
    const { seasonId } = useParams<{ seasonId: string }>();

    return (
        <div>
            <h1>Races for Season</h1>
            <p>Selected Season: {seasonId}</p>
        </div>
    );
};

export default RacesForSeason;
