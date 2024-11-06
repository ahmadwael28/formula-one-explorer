// src/pages/SeasonListing.tsx
import React, { useEffect, useState } from 'react';
import { fetchSeasons } from '../api/api';
import SeasonCard from '../components/SeasonCard';
import SeasonList from '../components/SeasonList';
import { ToggleButton, ToggleButtonGroup, Pagination } from '@mui/material';

interface Season {
    season: string;
    url: string;
}

const SeasonListing: React.FC = () => {
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [seasonsPerPage] = useState(10); // Set items per page

    useEffect(() => {
        const getSeasons = async () => {
            try {
                const data = await fetchSeasons();
                setSeasons(data);
            } catch (error) {
                console.error("Failed to fetch seasons data:", error);
            }
        };
        getSeasons();
    }, []);

    const indexOfLastSeason = currentPage * seasonsPerPage;
    const indexOfFirstSeason = indexOfLastSeason - seasonsPerPage;
    const currentSeasons = seasons.slice(indexOfFirstSeason, indexOfLastSeason);
    const totalPages = Math.ceil(seasons.length / seasonsPerPage);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'card') => {
        if (newView) {
            setViewMode(newView);
        }
    };

    return (
        <div>
            <h1>Season Listing</h1>
            <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewChange}
                aria-label="view mode"
                style={{ marginBottom: '16px' }}
            >
                <ToggleButton value="list" aria-label="list view">List View</ToggleButton>
                <ToggleButton value="card" aria-label="card view">Card View</ToggleButton>
            </ToggleButtonGroup>

            {viewMode === 'list' ? (
                <SeasonList seasons={currentSeasons} />
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {currentSeasons.map((season) => (
                        <SeasonCard
                            key={season.season}
                            season={season.season}
                        />
                    ))}
                </div>
            )}

            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '16px' }}
            />
        </div>
    );
};

export default SeasonListing;
