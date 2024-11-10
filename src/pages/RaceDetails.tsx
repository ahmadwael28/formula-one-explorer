import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, CircularProgress, Box, ToggleButton, ToggleButtonGroup, Button, useTheme, useMediaQuery } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import BarChartIcon from '@mui/icons-material/BarChart';
import moment from 'moment';
import { fetchRaceResults } from '../api/api';
import RaceResultsTable from '../components/raceREsultsTable/RaceResultsTable';
import PerformanceChart from '../components/performanceChart/PerformanceChart';

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
        <Box style={{ paddingTop: '1rem', color: theme.palette.text.primary }}>
            <Typography
                variant="h4"
                component="h1"
                style={{
                    fontSize: '52px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#ffffff',
                    textAlign: isSmallScreen ? 'center' : 'left',
                }}
            >
                Race Details - Season {seasonId}, Round {round}
            </Typography>

            {!error ? (
                <>
                    <Box
                        display="flex"
                        justifyContent={isSmallScreen ? 'center' : 'space-between'}
                        alignItems="center"
                        flexDirection={isSmallScreen ? 'column' : 'row'}
                        marginBottom="16px"
                        textAlign={isSmallScreen ? 'center' : 'left'}
                    >
                        <Typography variant="subtitle1" style={{ color: theme.palette.text.secondary, marginBottom: isSmallScreen ? '8px' : '0' }}>
                            Participating Drivers
                        </Typography>

                        <ToggleButtonGroup
                            value={viewMode}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="view mode"
                            style={{
                                marginTop: isSmallScreen ? '8px' : 0,
                            }}
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
                        <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : viewMode === 'list' ? (
                        <RaceResultsTable drivers={drivers} />
                    ) : (
                        <Box display="flex" justifyContent="center">
                            <PerformanceChart data={chartData} formatMillisToTime={(millis) => moment.utc(moment.duration(parseInt(millis, 10)).asMilliseconds()).format('H:mm:ss.SSS')} />
                        </Box>
                    )}
                </>
            ) : (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ height: '60vh', textAlign: 'center' }}>
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
