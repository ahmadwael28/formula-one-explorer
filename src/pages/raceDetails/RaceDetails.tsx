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

interface Driver {
    position: string;
    Driver: { givenName: string; familyName: string; nationality: string };
    Constructor: { name: string };
    Time?: { time: string; millis: string };
}

const RaceDetails: React.FC = () => {
    const { seasonId, round } = useParams<{ seasonId: string; round: string }>();
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    const loadRaceResults = async () => {
        setLoading(true);
        setError(false);
        try {
            const results = await fetchRaceResults(seasonId!, round!);
            setDrivers(results);
        } catch (error) {
            console.error("Failed to fetch race results:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRaceResults();
    }, [seasonId, round]);

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'chart') => {
        if (newView) {
            setViewMode(newView);
        }
    };

    const chartData = drivers
        .filter(driver => driver.Time?.millis)
        .map(driver => ({
            name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            time: parseInt(driver.Time!.millis, 10),
            formattedTime: moment.utc(moment.duration(parseInt(driver.Time!.millis, 10)).asMilliseconds()).format('H:mm:ss.SSS'),
        }));

    return (
        <Box className={classes.root}>
            <Breadcrumb
                links={[
                    { label: 'Seasons', path: '/' },
                    { label: `Races for Season ${seasonId}`, path: `/season/${seasonId}` }
                ]}
                currentPage={`Race Details - Round ${round}`}
            />

            <Typography variant="h4" component="h1" className={classes.title}>
                Race Details - Season {seasonId}, Round {round}
            </Typography>

            {!error ? (
                <>
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

                    {loading ? (
                        <Box className={classes.loadingContainer}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : viewMode === 'list' ? (
                        <RaceResultsTable drivers={drivers} />
                    ) : (
                        <Box className={classes.chartContainer}>
                            <PerformanceChart data={chartData} formatMillisToTime={(millis) => moment.utc(moment.duration(parseInt(millis, 10)).asMilliseconds()).format('H:mm:ss.SSS')} />
                        </Box>
                    )}
                </>
            ) : (
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
