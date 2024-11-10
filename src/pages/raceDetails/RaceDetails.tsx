import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, CircularProgress, Box, ToggleButton, ToggleButtonGroup, Button, useTheme, useMediaQuery } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import BarChartIcon from '@mui/icons-material/BarChart';
import moment from 'moment';
import { fetchRaceResults } from '../../api/api';
import RaceResultsTable from '../../components/raceREsultsTable/RaceResultsTable';
import PerformanceChart from '../../components/performanceChart/PerformanceChart';
import Breadcrumb from '../../components/common/breadCrumb/Breadcrumb';
import useStyles from './styles';

// Define interface for Driver data structure
interface Driver {
    position: string;
    Driver: { givenName: string; familyName: string; nationality: string };
    Constructor: { name: string };
    Time?: { time: string; millis: string };
}

const RaceDetails: React.FC = () => {
    // Extract seasonId and round parameters from URL
    const { seasonId, round } = useParams<{ seasonId: string; round: string }>();
    const navigate = useNavigate(); // Initialize navigate for programmatic routing

    // Component state hooks
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'chart'>('list'); // 'list' or 'chart' view

    const theme = useTheme(); // Material-UI theme
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is small
    const classes = useStyles(); // Use custom styles

    // Fetch race results from API based on seasonId and round
    const loadRaceResults = async () => {
        setLoading(true);
        setError(false);
        try {
            const results = await fetchRaceResults(seasonId!, round!); // Fetch data with non-null assertion
            setDrivers(results);
        } catch (error) {
            console.error("Failed to fetch race results:", error);
            setError(true); // Set error if API call fails
        } finally {
            setLoading(false); // Set loading to false when API call is complete
        }
    };

    // Fetch data on component mount and when seasonId or round changes
    useEffect(() => {
        loadRaceResults();
    }, [seasonId, round]);

    // Handle view toggle between list and chart views
    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'chart') => {
        if (newView) {
            setViewMode(newView);
        }
    };

    // Prepare chart data by formatting drivers' lap times
    const chartData = drivers
        .filter(driver => driver.Time?.millis) // Filter out drivers without lap times
        .map(driver => ({
            name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            time: parseInt(driver.Time!.millis, 10), // Parse time in milliseconds
            formattedTime: moment.utc(moment.duration(parseInt(driver.Time!.millis, 10)).asMilliseconds()).format('H:mm:ss.SSS'),
        }));

    return (
        <Box className={classes.root}>
            {/* Breadcrumb navigation */}
            <Breadcrumb
                links={[
                    { label: 'Seasons', path: '/' },
                    { label: `Races for Season ${seasonId}`, path: `/season/${seasonId}` }
                ]}
                currentPage={`Race Details - Round ${round}`}
            />

            {/* Page title */}
            <Typography variant="h4" component="h1" className={classes.title}>
                Race Details - Season {seasonId}, Round {round}
            </Typography>

            {/* Conditionally render content based on error state */}
            {!error ? (
                <>
                    {/* View toggle buttons and subtitle */}
                    <Box className={classes.toggleContainer}>
                        <Typography variant="subtitle1" className={classes.subtitle}>
                            Participating Drivers
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
                            <ToggleButton value="chart" aria-label="chart view">
                                <BarChartIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* Show loading spinner if data is still being fetched */}
                    {loading ? (
                        <Box className={classes.loadingContainer}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : viewMode === 'list' ? (
                        // Render race results as a table if list view is selected
                        <RaceResultsTable drivers={drivers} />
                    ) : (
                        // Render race performance as a chart if chart view is selected
                        <Box className={classes.chartContainer}>
                            <PerformanceChart data={chartData} formatMillisToTime={(millis) => moment.utc(moment.duration(parseInt(millis, 10)).asMilliseconds()).format('H:mm:ss.SSS')} />
                        </Box>
                    )}
                </>
            ) : (
                // Error message and 'Go to Home' button if an error occurred
                <Box className={classes.errorContainer}>
                    <Typography variant="h6" color="error" gutterBottom>
                        Failed to load race results. Please try again later.
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => navigate('/')}>
                        Go to Home
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default RaceDetails;
