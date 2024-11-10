import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRacesForSeason } from '../api/api';
import {
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    CircularProgress,
    Box,
    Grid2,
    Snackbar,
    Slide,
    Button,
    useTheme,
    Pagination,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import useMediaQuery from '@mui/material/useMediaQuery';
import Breadcrumb from '../components/common/Breadcrumb';
import RaceCard from '../components/raceCard/RaceCard';
import SeasonRacesTable from '../components/seasonRacesTable/SeasonRacesTable';

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
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { seasonId } = useParams<{ seasonId: string }>();
    const navigate = useNavigate();
    const [races, setRaces] = useState<Race[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [animationClass, setAnimationClass] = useState<string>('');

    const racesPerPage = viewMode === 'card' ? 4 : 10;

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
        setError(null);
        try {
            const { races } = await fetchRacesForSeason(seasonId);
            if (races.length === 0) {
                setError(`No races found for season ${seasonId}.`);
            } else {
                setRaces(sortRaces(races));
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch race data:', error);
            setError('Failed to fetch race data. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAndSortRaces();
    }, [seasonId]);

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'card') => {
        if (newView) {
            setViewMode(newView);
            setCurrentPage(1);
        }
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setAnimationClass('fade-out');
        setTimeout(() => {
            setCurrentPage(page);
            setAnimationClass('slide-in');
        }, 300);
    };

    const handleTogglePin = (race: Race) => {
        const pinnedRacesKey = getPinnedRacesKey();
        const pinnedRaces = JSON.parse(localStorage.getItem(pinnedRacesKey) || '[]');
        const isPinned = pinnedRaces.includes(race.round);

        const updatedPinnedRaces = isPinned
            ? pinnedRaces.filter((round: string) => round !== race.round)
            : [...pinnedRaces, race.round];

        localStorage.setItem(pinnedRacesKey, JSON.stringify(updatedPinnedRaces));
        setRaces((prevRaces) => sortRaces(prevRaces));

        setSnackbarMessage(
            isPinned
                ? 'Race un-pinned and moved to its original position!'
                : 'Race pinned and moved to the beginning!'
        );

        setSnackbarOpen(true);
    };

    const handleRowClick = (race: Race) => {
        navigate(`/season/race/${seasonId}/${race.round}`);
    };

    const pinnedRaces = JSON.parse(localStorage.getItem(getPinnedRacesKey()) || '[]');

    return (
        <div style={{ color: theme.palette.text.primary, paddingTop: '1rem', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflowY: 'hidden' }}>
            <Breadcrumb
                links={[{ label: 'Seasons', path: '/' }]}
                currentPage={`Season ${seasonId}`}
            />
            <Typography variant="h4" component="h1" style={{ fontSize: '52px', fontWeight: 'bold', color: theme.palette.text.secondary, marginBottom: '8px', textAlign: isSmallScreen ? 'center' : 'left' }}>
                Races for Season {seasonId}
            </Typography>

            {!error && (
                <div style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: isSmallScreen ? 'center' : 'space-between', alignItems: 'center', marginBottom: '16px', textAlign: isSmallScreen ? 'center' : 'left' }}>
                    <Typography variant="subtitle1" style={{ color: theme.palette.text.secondary, marginBottom: isSmallScreen ? '8px' : '0' }}>Select a race to view details.</Typography>
                    <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewChange} aria-label="view mode" style={{ alignSelf: isSmallScreen ? 'center' : 'flex-end' }}>
                        <ToggleButton value="list" aria-label="list view"><ListIcon /></ToggleButton>
                        <ToggleButton value="card" aria-label="card view"><GridViewIcon /></ToggleButton>
                    </ToggleButtonGroup>
                </div>
            )}

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" style={{ flexGrow: 1 }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : error ? (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ flexGrow: 1 }}>
                    <Typography variant="h6" style={{ color: theme.palette.error.main, marginBottom: '16px' }}>
                        {error}
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => navigate('/')}>
                        Go Back to Home
                    </Button>
                </Box>
            ) : races.length === 0 ? (
                <Typography variant="body1" color="textSecondary" textAlign="center" marginTop={4}>
                    No races available for this season.
                </Typography>
            ) : viewMode === 'list' ? (
                <SeasonRacesTable
                    races={races}
                    onRowClick={handleRowClick}
                    onTogglePin={handleTogglePin}
                    pinnedRaces={pinnedRaces}
                />
            ) : (
                <div className={animationClass} style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease', height: 'calc(100vh - 360px)', overflowY: 'auto' }}>
                    <Grid2 container spacing={3} justifyContent="center" style={{ padding: '8px' }}>
                        {races.slice((currentPage - 1) * 4, currentPage * 4).map((race) => (
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={race.raceName}>
                                <RaceCard seasonId={seasonId!} race={race} togglePinCallback={() => handleTogglePin(race)} />
                            </Grid2>
                        ))}
                    </Grid2>
                </div>
            )}

            {viewMode === 'card' && !error && (
                <Box display="flex" justifyContent="center" marginTop="16px">
                    <Pagination count={Math.ceil(races.length / 4)} page={currentPage} onChange={handlePageChange} color="primary" />
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={(props) => <Slide {...props} direction="down" />}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backdropFilter: 'blur(10px)',
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
