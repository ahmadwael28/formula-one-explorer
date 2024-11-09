// // src/pages/RaceDetails.tsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Typography, CircularProgress, Box, TableCell, useTheme, useMediaQuery } from '@mui/material';
// import moment from 'moment';
// import { fetchRaceResults } from '../api/api';
// import PaginatedTable from '../components/common/paginatedTable/PaginatedTable';

// interface Driver {
//     position: string;
//     Driver: { givenName: string; familyName: string; nationality: string };
//     Constructor: { name: string };
//     Time?: { time: string };
// }

// const RaceDetails: React.FC = () => {
//     const { seasonId, round } = useParams<{ seasonId: string; round: string }>();
//     const [drivers, setDrivers] = useState<Driver[]>([]);
//     const [loading, setLoading] = useState(true);
//     const theme = useTheme();
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//     const loadRaceResults = async () => {
//         setLoading(true);
//         try {
//             const results = await fetchRaceResults(seasonId!, round!);
//             setDrivers(results);
//         } catch (error) {
//             console.error("Failed to fetch race results:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadRaceResults();
//     }, [seasonId, round]);

//     const headers = ["#", "Position", "Driver Name", "Nationality", "Team", "Time"];

//     const renderRow = (driver: Driver, index: number) => (
//         <>
//             <TableCell>{index + 1}</TableCell> {/* Column for numbering */}
//             <TableCell>{driver.position}</TableCell> {/* Position in the race */}
//             <TableCell>{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</TableCell>
//             <TableCell>{driver.Driver.nationality}</TableCell>
//             <TableCell>{driver.Constructor.name}</TableCell>
//             <TableCell>{driver.Time?.time || "N/A"}</TableCell>
//         </>
//     );

//     return (
//         <Box style={{ paddingTop: '1rem', color: theme.palette.text.primary }}>
//             <Typography
//                 variant="h4"
//                 component="h1"
//                 style={{
//                     fontSize: '52px',
//                     fontWeight: 'bold',
//                     marginBottom: '8px',
//                     color: '#ffffff', // Light color for the title
//                     textAlign: isSmallScreen ? 'center' : 'left', // Centered on small screens
//                 }}
//             >
//                 Race Details - Season {seasonId}, Round {round}
//             </Typography>
//             <Typography
//                 variant="h5"
//                 style={{
//                     marginBottom: '16px',
//                     color: '#cccccc', // Light color for the subtitle
//                     textAlign: isSmallScreen ? 'center' : 'left', // Centered on small screens
//                 }}
//             >
//                 Participating Drivers
//             </Typography>
//             {loading ? (
//                 <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
//                     <CircularProgress color="primary" />
//                 </Box>
//             ) : (
//                 <PaginatedTable
//                     headers={headers}
//                     data={drivers}
//                     rowsPerPage={10} // Adjusted rows per page for more data visibility
//                     renderRow={(driver, index) => renderRow(driver, index)}
//                     fixedHeight={550} // Increased height for more items
//                 />
//             )}
//         </Box>
//     );
// };

// export default RaceDetails;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Box, TableCell, ToggleButton, ToggleButtonGroup, useTheme, useMediaQuery } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import BarChartIcon from '@mui/icons-material/BarChart';
import moment from 'moment';
import { fetchRaceResults } from '../api/api';
import PaginatedTable from '../components/common/paginatedTable/PaginatedTable';

interface Driver {
    position: string;
    Driver: { givenName: string; familyName: string; nationality: string };
    Constructor: { name: string };
    Time?: { time: string };
}

const RaceDetails: React.FC = () => {
    const { seasonId, round } = useParams<{ seasonId: string; round: string }>();
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'chart'>('list'); // State for toggle
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const loadRaceResults = async () => {
        setLoading(true);
        try {
            const results = await fetchRaceResults(seasonId!, round!);
            setDrivers(results);
        } catch (error) {
            console.error("Failed to fetch race results:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRaceResults();
    }, [seasonId, round]);

    const headers = ["#", "Position", "Driver Name", "Nationality", "Team", "Time"];

    // Helper function to convert position to ordinal (1st, 2nd, 3rd, etc.)
    const formatPosition = (position: string) => {
        const num = parseInt(position, 10);
        const suffixes = ["th", "st", "nd", "rd"];
        const v = num % 100;
        return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const renderRow = (driver: Driver, index: number) => (
        <>
            <TableCell>{index + 1}</TableCell> {/* Column for numbering */}
            <TableCell>{formatPosition(driver.position)}</TableCell> {/* Position in ordinal format */}
            <TableCell>{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</TableCell>
            <TableCell>{driver.Driver.nationality}</TableCell>
            <TableCell>{driver.Constructor.name}</TableCell>
            <TableCell>{driver.Time?.time || "N/A"}</TableCell>
        </>
    );

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'chart') => {
        if (newView) {
            setViewMode(newView);
        }
    };

    return (
        <Box style={{ paddingTop: '1rem', color: theme.palette.text.primary }}>
            <Typography
                variant="h4"
                component="h1"
                style={{
                    fontSize: '52px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#ffffff', // Light color for the title
                    textAlign: isSmallScreen ? 'center' : 'left', // Centered on small screens
                }}
            >
                Race Details - Season {seasonId}, Round {round}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="16px">
                <Typography
                    variant="h5"
                    style={{
                        color: '#cccccc', // Light color for the subtitle
                        textAlign: isSmallScreen ? 'center' : 'left', // Centered on small screens
                    }}
                >
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
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                viewMode === 'list' ? (
                    <PaginatedTable
                        headers={headers}
                        data={drivers}
                        rowsPerPage={10} // Adjusted rows per page for more data visibility
                        renderRow={(driver, index) => renderRow(driver, index)}
                        fixedHeight={550} // Increased height for more items
                    />
                ) : (
                    <Box>
                        {/* Placeholder for chart component */}
                        <Typography style={{ textAlign: 'center', marginTop: '2rem' }}>
                            Chart view coming soon...
                        </Typography>
                    </Box>
                )
            )}
        </Box>
    );
};

export default RaceDetails;
