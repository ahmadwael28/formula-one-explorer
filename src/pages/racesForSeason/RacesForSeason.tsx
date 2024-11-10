import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRacesForSeason } from '../../api/api';
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
import Breadcrumb from '../../components/common/breadCrumb/Breadcrumb';
import RaceCard from '../../components/raceCard/RaceCard';
import SeasonRacesTable from '../../components/seasonRacesTable/SeasonRacesTable';
import useStyles from './styles';

// Define interface for race data
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
    const classes = useStyles();

    // Retrieve seasonId from URL parameters
    const { seasonId } = useParams<{ seasonId: string }>();
    const navigate = useNavigate();

    // Component state hooks
    const [races, setRaces] = useState<Race[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'card'>('card'); // Current view mode
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar for pin/unpin action feedback
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message text
    const [currentPage, setCurrentPage] = useState(1); // Current pagination page
    const [animationClass, setAnimationClass] = useState<string>(''); // Animation for page transition

    // Get localStorage key for pinned races in the current season
    const getPinnedRacesKey = () => `pinnedRaces_${seasonId}`;

    // Sort races by pinned status, with pinned races appearing at the top
    const sortRaces = (races: Race[]) => {
        const pinnedRaces = JSON.parse(localStorage.getItem(getPinnedRacesKey()) || '[]');
        return [...races].sort((a, b) => {
            const isPinnedA = pinnedRaces.includes(a.round);
            const isPinnedB = pinnedRaces.includes(b.round);
            return isPinnedA === isPinnedB ? parseInt(a.round) - parseInt(b.round) : isPinnedA ? -1 : 1;
        });
    };

    // Fetch and set races for the selected season, applying sorting and error handling
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

    // Run loadAndSortRaces on initial mount and when seasonId changes
    useEffect(() => {
        loadAndSortRaces();
    }, [seasonId]);

    // Handle switching between list and card view modes
    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'card') => {
        if (newView) {
            setViewMode(newView);
            setCurrentPage(1); // Reset pagination to first page on view change
        }
    };

    // Handle pagination changes with fade and slide animation
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setAnimationClass('fade-out');
        setTimeout(() => {
            setCurrentPage(page);
            setAnimationClass('slide-in');
        }, 300);
    };

    // Toggle pin/unpin status for a race, updating localStorage and sorting races
    const handleTogglePin = (race: Race) => {
        const pinnedRacesKey = getPinnedRacesKey();
        const pinnedRaces = JSON.parse(localStorage.getItem(pinnedRacesKey) || '[]');
        const isPinned = pinnedRaces.includes(race.round);

        // Update the list of pinned races in localStorage
        const updatedPinnedRaces = isPinned
            ? pinnedRaces.filter((round: string) => round !== race.round)
            : [...pinnedRaces, race.round];

        localStorage.setItem(pinnedRacesKey, JSON.stringify(updatedPinnedRaces));
        setRaces((prevRaces) => sortRaces(prevRaces));

        // Set snackbar message based on pin status
        setSnackbarMessage(
            isPinned
                ? 'Race un-pinned and moved to its original position!'
                : 'Race pinned and moved to the beginning!'
        );
        setSnackbarOpen(true); // Show snackbar with action feedback
    };

    // Navigate to race details on row click
    const handleRowClick = (race: Race) => {
        navigate(`/season/race/${seasonId}/${race.round}`);
    };

    // Retrieve pinned races for the current season from localStorage
    const pinnedRaces = JSON.parse(localStorage.getItem(getPinnedRacesKey()) || '[]');

    return (
        <div className={classes.root}>
            {/* Breadcrumb navigation */}
            <Breadcrumb
                links={[{ label: 'Seasons', path: '/' }]}
                currentPage={`Season ${seasonId}`}
            />

            {/* Page title */}
            <Typography variant="h4" component="h1" className={classes.header}>
                Races for Season {seasonId}
            </Typography>

            {/* View mode toggle and subtitle */}
            {!error && (
                <div className={classes.toggleContainer}>
                    <Typography variant="subtitle1" style={{ color: theme.palette.text.secondary }}>Select a race to view details.</Typography>
                    <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewChange} aria-label="view mode">
                        <ToggleButton value="list" aria-label="list view"><ListIcon /></ToggleButton>
                        <ToggleButton value="card" aria-label="card view"><GridViewIcon /></ToggleButton>
                    </ToggleButtonGroup>
                </div>
            )}

            {/* Conditional rendering for loading, error, or content display */}
            {loading ? (
                <Box className={classes.loadingContainer}>
                    <CircularProgress color="primary" />
                </Box>
            ) : error ? (
                <Box className={classes.errorContainer}>
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
                // Render list view if selected
                <SeasonRacesTable
                    races={races}
                    onRowClick={handleRowClick}
                    onTogglePin={handleTogglePin}
                    pinnedRaces={pinnedRaces}
                />
            ) : (
                // Render card view if selected, with animation and pagination
                <div className={`${classes.animationContainer} ${animationClass}`}>
                    <Grid2 container spacing={3} justifyContent="center" style={{ padding: '8px' }}>
                        {races.slice((currentPage - 1) * 4, currentPage * 4).map((race) => (
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={race.raceName}>
                                <RaceCard seasonId={seasonId!} race={race} togglePinCallback={() => handleTogglePin(race)} />
                            </Grid2>
                        ))}
                    </Grid2>
                </div>
            )}

            {/* Pagination controls for card view */}
            {viewMode === 'card' && !error && (
                <Box className={classes.paginationContainer}>
                    <Pagination count={Math.ceil(races.length / 4)} page={currentPage} onChange={handlePageChange} color="primary" />
                </Box>
            )}

            {/* Snackbar to display messages on pin/unpin actions */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={(props) => <Slide {...props} direction="down" />}
                classes={{ root: classes.snackbarContent }}
            />
        </div>
    );
};

export default RacesForSeason;
