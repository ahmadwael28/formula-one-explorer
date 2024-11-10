// src/pages/SeasonListing.tsx
import React, { useEffect, useState } from 'react';
import { fetchSeasons } from '../api/api';
import SeasonCard from '../components/seasonCard/SeasonCard';
import SeasonList from '../components/seasonList/SeasonList';
import { ToggleButton, ToggleButtonGroup, Pagination, Typography, useTheme, CircularProgress, Box, Grid2 } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Season {
    season: string;
    url: string;
}

const SeasonListing: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Media query for mobile view

    const [seasons, setSeasons] = useState<Season[]>([]);
    const [totalSeasons, setTotalSeasons] = useState(0);
    const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
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
            <Typography
                variant="h4"
                component="h1"
                style={{
                    fontSize: '52px',
                    fontWeight: 'bold',
                    color: theme.palette.text.secondary,
                    marginBottom: '8px',
                    textAlign: isSmallScreen ? 'center' : 'left',
                }}
            >
                Seasons
            </Typography>

            {/* Subtitle and Toggle Button */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row', // Stack vertically on small screens
                    justifyContent: isSmallScreen ? 'center' : 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    textAlign: isSmallScreen ? 'center' : 'left',
                }}
            >
                <Typography
                    variant="subtitle1"
                    style={{
                        color: theme.palette.text.secondary,
                        marginBottom: isSmallScreen ? '8px' : '0', // Add space below subtitle on small screens
                    }}
                >
                    Select a season to view its races.
                </Typography>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="view mode"
                    style={{
                        alignSelf: isSmallScreen ? 'center' : 'flex-end', // Center-align on small screens
                    }}
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
                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: 'calc(100vh - 264px)' }}>
                    <CircularProgress color="primary" />
                </Box>
            )}

            {/* Responsive Grid for Card/List View */}
            <div
                className={animationClass}
                style={{
                    display: loading ? 'none' : 'flex',
                    flexDirection: 'column',
                    transition: 'opacity 0.5s ease',
                    height: 'calc(100vh - 200px)',
                    overflowY: 'auto',
                }}
            >
                {viewMode === 'list' ? (
                    <SeasonList seasons={seasons} />
                ) : (
                    <Grid2 container spacing={3} justifyContent="center" style={{ padding: '8px', overflowY: "auto" }}>
                        {seasons.map((season) => (
                            <Grid2 size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }} key={season.season}>
                                <SeasonCard season={season} />
                            </Grid2>
                        ))}
                    </Grid2>
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
