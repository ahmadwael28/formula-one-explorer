import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, CircularProgress, Box, TableCell, ToggleButton, ToggleButtonGroup, Button, useTheme, useMediaQuery } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import BarChartIcon from '@mui/icons-material/BarChart';
import moment from 'moment';
import { fetchRaceResults } from '../api/api';
import PaginatedTable from '../components/common/paginatedTable/PaginatedTable';
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
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');
    const [error, setError] = useState<string | null>(null);

    const loadRaceResults = async () => {
        setLoading(true);
        setError(null);
        try {
            const results = await fetchRaceResults(seasonId!, round!);
            if (results.length === 0) {
                setError('No results found for this race.');
            } else {
                setDrivers(results);
            }
        } catch (error) {
            console.error("Failed to fetch race results:", error);
            setError("Failed to load race details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRaceResults();
    }, [seasonId, round]);

    const headers = ["#", "Position", "Driver Name", "Nationality", "Team", "Time"];

    const formatPosition = (position: string) => {
        const num = parseInt(position, 10);
        const suffixes = ["th", "st", "nd", "rd"];
        const v = num % 100;
        return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const formatMillisToTime = (millis: string) => {
        const duration = moment.duration(parseInt(millis, 10));
        return moment.utc(duration.asMilliseconds()).format('H:mm:ss.SSS');
    };

    const renderRow = (driver: Driver, index: number) => (
        <>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{formatPosition(driver.position)}</TableCell>
            <TableCell>{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</TableCell>
            <TableCell>{driver.Driver.nationality}</TableCell>
            <TableCell>{driver.Constructor.name}</TableCell>
            <TableCell>{driver.Time?.millis ? formatMillisToTime(driver.Time.millis) : 'N/A'}</TableCell>
        </>
    );

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
            formattedTime: formatMillisToTime(driver.Time!.millis),
        }));

    const handleGoHome = () => navigate('/');

    return (
        <Box style={{ paddingTop: '1rem', color: theme.palette.text.primary, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography
                variant="h4"
                component="h1"
                style={{
                    fontSize: '52px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#ffffff',
                    textAlign: isSmallScreen ? 'center' : 'left',
                    alignSelf: isSmallScreen ? 'center' : 'flex-start',
                }}
            >
                Race Details - Season {seasonId}, Round {round}
            </Typography>

            {error ? (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ flexGrow: 1 }}>
                    <Typography variant="h6" style={{ color: theme.palette.error.main, textAlign: 'center', marginBottom: '16px' }}>
                        {error}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleGoHome}>
                        Go to Home
                    </Button>
                </Box>
            ) : (
                <>
                    {!loading && (
                        <Box
                            display="flex"
                            justifyContent={isSmallScreen ? 'center' : 'space-between'}
                            alignItems="center"
                            flexDirection={isSmallScreen ? 'column' : 'row'}
                            marginBottom="16px"
                            textAlign={isSmallScreen ? 'center' : 'left'}
                            width="100%"
                        >
                            <Typography variant="subtitle1" style={{ color: theme.palette.text.secondary, marginBottom: isSmallScreen ? '8px' : '0', alignSelf: isSmallScreen ? 'center' : 'flex-start' }}>
                                Participating Drivers
                            </Typography>

                            <ToggleButtonGroup
                                value={viewMode}
                                exclusive
                                onChange={handleViewChange}
                                aria-label="view mode"
                                style={{
                                    alignSelf: isSmallScreen ? 'center' : 'flex-end',
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
                    )}

                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : viewMode === 'list' ? (
                        <PaginatedTable
                            headers={headers}
                            data={drivers}
                            rowsPerPage={10}
                            renderRow={(driver, index) => renderRow(driver, index)}
                            fixedHeight={500}
                        />
                    ) : (
                        <Box display="flex" justifyContent="center" style={{ width: '100%', height: '500px' }}>
                            <PerformanceChart data={chartData} formatMillisToTime={formatMillisToTime} />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default RaceDetails;
