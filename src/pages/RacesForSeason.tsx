import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRacesForSeason } from '../api/api';
import { ToggleButton, ToggleButtonGroup, Typography, CircularProgress, Pagination, Box, Grid2, useTheme } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import RaceCard from '../components/raceCard/RaceCard';
import RaceListItem from '../components/raceListItem/RaceListItem';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Race {
    round: string;
    raceName: string;
    Circuit: {
        circuitName: string;
        Location: {
            country: string;
            lat: string;
            long: string;
        };
    };
    date: string;
    url: string;
}

const RacesForSeason: React.FC = () => {
    const theme = useTheme();
    const isMediumOrSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Match up to 'md' screen size
    const { seasonId } = useParams<{ seasonId: string }>();
    const [races, setRaces] = useState<Race[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRaces, setTotalRaces] = useState(0);
    const [animationClass, setAnimationClass] = useState<string>('');
    const racesPerPage = 4;

    const fetchRaces = async (page: number) => {
        if (!seasonId) return;
        setLoading(true);
        setAnimationClass('fade-out');
        setTimeout(async () => {
            const offset = (page - 1) * racesPerPage;
            try {
                const { races, total } = await fetchRacesForSeason(seasonId, racesPerPage, offset);
                setRaces(races);
                setTotalRaces(total);

                setAnimationClass('');
                setTimeout(() => {
                    setAnimationClass('slide-in');
                    setLoading(false);
                }, 10);
            } catch (error) {
                console.error("Failed to fetch race data:", error);
            }
        }, 300);
    };

    useEffect(() => {
        fetchRaces(currentPage);
    }, [seasonId, currentPage]);

    const totalPages = Math.ceil(totalRaces / racesPerPage);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        fetchRaces(page);
        setCurrentPage(page);
    };

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'card') => {
        if (newView) {
            setViewMode(newView);
        }
    };

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
                    textAlign: isMediumOrSmallScreen ? 'center' : 'left',
                }}
            >
                Races for Season {seasonId}
            </Typography>

            {/* Subtitle and Toggle Button */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: isMediumOrSmallScreen ? 'column' : 'row',
                    justifyContent: isMediumOrSmallScreen ? 'center' : 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    textAlign: isMediumOrSmallScreen ? 'center' : 'left',
                }}
            >
                <Typography
                    variant="subtitle1"
                    style={{
                        color: theme.palette.text.secondary,
                        marginBottom: isMediumOrSmallScreen ? '8px' : '0',
                    }}
                >
                    Select a race to view details.
                </Typography>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="view mode"
                    style={{
                        alignSelf: isMediumOrSmallScreen ? 'center' : 'flex-end',
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
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: 'calc(100vh - 200px)' }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <div className={animationClass} style={{ display: 'flex', flexDirection: 'column', transition: 'opacity 0.5s ease, transform 0.5s ease', height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                    {viewMode === 'list' ? (
                        <ul style={{ padding: 0, listStyle: 'none', width: isMediumOrSmallScreen ? '100%' : '75%', margin: isMediumOrSmallScreen ? '0' : '0 auto' }}>
                            {races.map((race) => (
                                <RaceListItem key={race.raceName} race={race} />
                            ))}
                        </ul>
                    ) : (
                        <Grid2 container spacing={3} justifyContent="center" style={{ padding: '8px', overflowY: "auto" }}>
                            {races.map((race) => (
                                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={race.raceName}>
                                    <RaceCard seasonId={seasonId!} race={race} />
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                </div>
            )}

            {/* Centered Pagination */}
            <Box display="flex" justifyContent="center" marginTop="16px">
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
            </Box>
        </div>
    );
};

export default RacesForSeason;
