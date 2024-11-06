// src/pages/SeasonListing.tsx
import React, { useEffect, useState } from 'react';
import { fetchSeasons } from '../api/api';

interface Season {
    season: string;
    url: string;
}

const SeasonListing: React.FC = () => {
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getSeasons = async () => {
            try {
                const data = await fetchSeasons();
                setSeasons(data); // Set the seasons data if successful
            } catch (err) {
                setError("Failed to fetch seasons data."); // Set an error message if the fetch fails
            }
        };

        getSeasons();
    }, []);

    return (
        <div>
            <h1>Season Listing</h1>
            {error ? (
                <p>{error}</p> // Display error message if there is an error
            ) : (
                <ul>
                    {seasons.map((season) => (
                        <li key={season.season}>
                            <a href={season.url} target="_blank" rel="noopener noreferrer">
                                {season.season}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SeasonListing;
