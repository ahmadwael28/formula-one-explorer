import React, { useEffect, useState } from 'react';
import { fetchSeasons } from '../../api/api';
import SeasonCard from '../../components/seasonCard/SeasonCard';
import SeasonList from '../../components/seasonList/SeasonList';
import Breadcrumb from '../../components/common/breadCrumb/Breadcrumb';
import {
    ToggleButton,
    ToggleButtonGroup,
    Pagination,
    Typography,
    CircularProgress,
    Box,
    Grid2,
    useTheme,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import useMediaQuery from '@mui/material/useMediaQuery';
import useStyles from './styles';

// Define the data structure for each season
interface Season {
    season: string;
    url: string;
}

const SeasonListing: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small for responsive adjustments
    const classes = useStyles(); // Import custom styles

    // State hooks to manage fetched data, view mode, and UI states
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [totalSeasons, setTotalSeasons] = useState(0);
    const [viewMode, setViewMode] = useState<'list' | 'card'>('card'); // Initial view mode is card view
    const [currentPage, setCurrentPage] = useState(1); // Track current page in pagination
    const [animationClass, setAnimationClass] = useState<string>(''); // Class for animations during page transitions
    const [loading, setLoading] = useState(false); // Display loading indicator while data is fetched
    const [error, setError] = useState<string | null>(null); // Track any errors during data fetching
    const seasonsPerPage = 10; // Set the number of seasons per page

    // Function to fetch seasons data and handle pagination
    const fetchAndSetSeasons = async (page: number) => {
        setLoading(true);
        setError(null); // Clear previous error messages
        setAnimationClass('fade-out'); // Trigger fade-out animation on data reload
        setTimeout(async () => {
            const offset = (page - 1) * seasonsPerPage;
            try {
                const { seasons, total } = await fetchSeasons(seasonsPerPage, offset);
                if (seasons.length === 0) {
                    setError('No seasons found.'); // Set error if no data is returned
                } else {
                    setSeasons(seasons); // Set fetched seasons in state
                    setTotalSeasons(total); // Set total seasons count for pagination
                }
                setAnimationClass('');
                setTimeout(() => {
                    setAnimationClass('slide-in'); // Trigger slide-in animation on data reload
                    setLoading(false);
                }, 50);
            } catch (error) {
                console.error("Failed to fetch seasons data:", error);
                setError("Failed to fetch seasons data. Please try again later.");
                setLoading(false);
            }
        }, 300);
    };

    // Fetch data whenever the current page changes
    useEffect(() => {
        fetchAndSetSeasons(currentPage);
    }, [currentPage]);

    // Update page and fetch data when pagination changes
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        fetchAndSetSeasons(page);
        setCurrentPage(page);
    };

    // Toggle between list and card view modes
    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'card') => {
        if (newView) {
            setViewMode(newView);
        }
    };

    // Calculate total pages for pagination based on the total count and items per page
    const totalPages = Math.ceil(totalSeasons / seasonsPerPage);

    return (
        <div className={classes.root}>
            {/* Breadcrumb navigation */}
            <Breadcrumb links={[]} currentPage="Seasons" />

            {/* Page title */}
            <Typography variant="h4" component="h1" className={classes.title}>
                Seasons
            </Typography>

            {/* View mode toggle buttons and subheading */}
            {!error && (
                <div className={classes.toggleContainer}>
                    <Typography variant="subtitle1" style={{ color: theme.palette.text.secondary }}>
                        Select a season to view its races.
                    </Typography>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="view mode"
                        className={classes.toggleButtonGroup}
                    >
                        <ToggleButton value="list" aria-label="list view">
                            <ListIcon />
                        </ToggleButton>
                        <ToggleButton value="card" aria-label="card view">
                            <GridViewIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            )}

            {/* Conditional rendering for loading, error, or season data */}
            {loading ? (
                // Loading spinner
                <Box className={classes.loadingContainer}>
                    <CircularProgress color="primary" />
                </Box>
            ) : error ? (
                // Display error message if fetching fails
                <Box className={classes.errorContainer}>
                    <Typography variant="h6" style={{ color: theme.palette.error.main }}>
                        {error}
                    </Typography>
                </Box>
            ) : (
                // Display season data in list or card view
                <div className={`${classes.listContainer} ${animationClass}`}>
                    {viewMode === 'list' ? (
                        <SeasonList seasons={seasons} />
                    ) : (
                        <Grid2 container spacing={3} justifyContent="center" style={{ padding: '8px' }}>
                            {seasons.map((season, index) => (
                                <Grid2 size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }} key={season.season}>
                                    <SeasonCard season={season} index={index} />
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                </div>
            )}

            {/* Pagination controls */}
            {!error && (
                <Box className={classes.paginationContainer}>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                </Box>
            )}
        </div>
    );
};

export default SeasonListing;
