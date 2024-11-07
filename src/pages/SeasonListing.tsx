// src/pages/SeasonListing.tsx
import React, { useEffect, useState } from 'react';
import { fetchSeasons } from '../api/api';
import SeasonCard from '../components/seasonCard/SeasonCard';
import SeasonList from '../components/seasonList/SeasonList';
import { ToggleButton, ToggleButtonGroup, Pagination, Typography, useTheme, CircularProgress, Box } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';

interface Season {
    season: string;
    url: string;
}

const SeasonListing: React.FC = () => {
    const theme = useTheme();
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [totalSeasons, setTotalSeasons] = useState(0);
    const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [animationClass, setAnimationClass] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const seasonsPerPage = 10;

    const fetchAndSetSeasons = async (page: number) => {
        setLoading(true);
        setAnimationClass('fade-out');
        setTimeout(async () => {
            const offset = (page - 1) * seasonsPerPage;
            try {
                const { seasons, total } = await fetchSeasons(seasonsPerPage, offset);
                setSeasons(seasons);
                setTotalSeasons(total);

                setAnimationClass('');
                setTimeout(() => {
                    setAnimationClass('slide-in');
                    setLoading(false);
                }, 50);
            } catch (error) {
                console.error("Failed to fetch seasons data:", error);
            }
        }, 300);
    };

    useEffect(() => {
        fetchAndSetSeasons(currentPage);
    }, []);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        fetchAndSetSeasons(page);
        setCurrentPage(page);
    };

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'card') => {
        if (newView) {
            setViewMode(newView);
        }
    };

    const totalPages = Math.ceil(totalSeasons / seasonsPerPage);

    return (
        <div style={{ color: theme.palette.text.primary, padding: '1rem', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflowY: "hidden" }}>
            {/* Title */}
            <Typography variant="h4" component="h1" style={{ fontSize: '52px', fontWeight: 'bold', color: theme.palette.text.secondary, marginBottom: '8px' }}>
                Seasons
            </Typography>

            {/* Subtitle and Toggle Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Typography variant="subtitle1" style={{ color: theme.palette.text.secondary }}>
                    Select a season to view its races.
                </Typography>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="view mode"
                >
                    <ToggleButton value="list" aria-label="list view">
                        <ListIcon />
                    </ToggleButton>
                    <ToggleButton value="card" aria-label="card view">
                        <GridViewIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: 'calc(100vh - 200px)' }}>
                    <CircularProgress color="primary" />
                </Box>
            )}

            {/* Centered Card/List View with Animation */}
            <div
                className={animationClass}
                style={{
                    display: loading ? 'none' : 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    transition: 'opacity 0.5s ease',
                    height: 'calc(100vh - 200px)',
                    overflowX: 'hidden',
                }}
            >
                {viewMode === 'list' ? (
                    <SeasonList seasons={seasons} />
                ) : (
                    seasons.map((season) => (
                        <SeasonCard key={season.season} season={season} />
                    ))
                )}
            </div>

            {/* Centered Pagination */}
            <Box display="flex" justifyContent="center" marginTop="16px">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </div>
    );
};

export default SeasonListing;
