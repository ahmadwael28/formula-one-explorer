import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRacesForSeason } from '../api/api';
import { ToggleButton, ToggleButtonGroup, Typography, CircularProgress, Pagination, Box, Grid2, useTheme, Snackbar, Slide } from '@mui/material';
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
    const isMediumOrSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { seasonId } = useParams<{ seasonId: string }>();
    const [races, setRaces] = useState<Race[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const racesPerPage = 4;

    const getPinnedRacesKey = () => `pinnedRaces_${seasonId}`;

    const sortRaces = (races: Race[]) => {
        const pinnedRaces = JSON.parse(localStorage.getItem(getPinnedRacesKey()) || '[]');
        return [...races].sort((a, b) => {
            const isPinnedA = pinnedRaces.includes(a.round);
            const isPinnedB = pinnedRaces.includes(b.round);
            return isPinnedA === isPinnedB ? parseInt(a.round) - parseInt(b.round) : isPinnedA ? -1 : 1;
        });
    };

    const loadAndSortRaces = async () => {
        if (!seasonId) return;
        setLoading(true);
        try {
            const { races } = await fetchRacesForSeason(seasonId);
            setRaces(sortRaces(races));
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch race data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAndSortRaces();
    }, [seasonId]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'card') => {
        if (newView) {
            setViewMode(newView);
        }
    };

    const handleTogglePin = () => {
        setRaces((prevRaces) => sortRaces(prevRaces));
        setSnackbarOpen(true);
    };

    // Get paginated races for current page
    const paginatedRaces = races.slice((currentPage - 1) * racesPerPage, currentPage * racesPerPage);

    return (
        <div style={{ color: theme.palette.text.primary, padding: '1rem', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflowY: 'hidden' }}>
            {/* Title */}
            <Typography variant="h4" component="h1" style={{ fontSize: '52px', fontWeight: 'bold', color: theme.palette.text.secondary, marginBottom: '8px', textAlign: isMediumOrSmallScreen ? 'center' : 'left' }}>
                Races for Season {seasonId}
            </Typography>

            {/* Subtitle and Toggle Button */}
            <div style={{ display: 'flex', flexDirection: isMediumOrSmallScreen ? 'column' : 'row', justifyContent: isMediumOrSmallScreen ? 'center' : 'space-between', alignItems: 'center', marginBottom: '16px', textAlign: isMediumOrSmallScreen ? 'center' : 'left' }}>
                <Typography variant="subtitle1" style={{ color: theme.palette.text.secondary, marginBottom: isMediumOrSmallScreen ? '8px' : '0' }}>Select a race to view details.</Typography>
                <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewChange} aria-label="view mode" style={{ alignSelf: isMediumOrSmallScreen ? 'center' : 'flex-end' }}>
                    <ToggleButton value="list" aria-label="list view"><ListIcon /></ToggleButton>
                    <ToggleButton value="card" aria-label="card view"><GridViewIcon /></ToggleButton>
                </ToggleButtonGroup>
            </div>

            {/* Loading Spinner */}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" style={{ flexGrow: 1 }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {viewMode === 'list' ? (
                        <ul style={{ padding: 0, listStyle: 'none', width: isMediumOrSmallScreen ? '100%' : '75%', margin: isMediumOrSmallScreen ? '0' : '0 auto' }}>
                            {paginatedRaces.map((race) => (
                                <RaceListItem key={race.raceName} race={race} />
                            ))}
                        </ul>
                    ) : (
                        <Grid2 container spacing={3} justifyContent="center" style={{ padding: '8px' }}>
                            {paginatedRaces.map((race) => (
                                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={race.raceName}>
                                    <RaceCard seasonId={seasonId!} race={race} togglePinCallback={handleTogglePin} />
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                </div>
            )}

            {/* Centered Pagination */}
            <Box display="flex" justifyContent="center" marginTop="16px">
                <Pagination count={Math.ceil(races.length / racesPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
            </Box>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Race pinned and moved to the top!"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={(props) => <Slide {...props} direction="down" />}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backdropFilter: 'blur(10px)', // Applies blur effect
                        color: theme.palette.text.primary,
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        padding: '8px 16px',
                    },
                }}
            />
        </div>
    );
};

export default RacesForSeason;

