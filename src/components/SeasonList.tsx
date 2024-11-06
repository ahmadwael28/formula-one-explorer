// src/components/SeasonList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SeasonListProps {
    seasons: { season: string }[];
}

const SeasonList: React.FC<SeasonListProps> = ({ seasons }) => {
    const navigate = useNavigate();

    const handleSeasonClick = (season: string) => {
        navigate(`/season/${season}`); // Navigate to RacesForSeason with season as param
    };

    return (
        <ul>
            {seasons.map((season) => (
                <li
                    key={season.season}
                    onClick={() => handleSeasonClick(season.season)}
                    style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #ccc' }}
                >
                    Season {season.season}
                </li>
            ))}
        </ul>
    );
};

export default SeasonList;
