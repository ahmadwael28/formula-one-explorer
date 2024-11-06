// src/components/SeasonCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SeasonCardProps {
    season: string;
    onClick?: () => void;
}

const SeasonCard: React.FC<SeasonCardProps> = ({ season }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/season/${season}`); // Navigate to RacesForSeason with season as param
    };

    return (
        <div onClick={handleCardClick} style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', cursor: 'pointer' }}>
            <h3>Season {season}</h3>
            <p>View races for season {season}</p>
        </div>
    );
};

export default SeasonCard;
