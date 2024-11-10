import React from 'react';
import { TableCell, Box, Typography } from '@mui/material';
import PaginatedTable from '../common/paginatedTable/PaginatedTable';
import moment from 'moment';
import nationalityToCountryCode from './nationalityToCountryCode';

interface Driver {
    position: string;
    Driver: { givenName: string; familyName: string; nationality: string };
    Constructor: { name: string };
    Time?: { time: string; millis: string };
}

interface RaceResultsTableProps {
    drivers: Driver[];
}

const RaceResultsTable: React.FC<RaceResultsTableProps> = ({ drivers }) => {
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

    const renderRow = (driver: Driver, index: number) => {
        const countryCode = nationalityToCountryCode[driver.Driver.nationality];
        return (
            <>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{formatPosition(driver.position)}</TableCell>
                <TableCell>{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</TableCell>
                <TableCell>
                    <Box display="flex" alignItems="center">
                        {countryCode && (
                            <img
                                src={`https://flagcdn.com/16x12/${countryCode}.png`}
                                alt={`${driver.Driver.nationality} flag`}
                                style={{ marginRight: '8px' }}
                            />
                        )}
                        <Typography variant="body2">{driver.Driver.nationality}</Typography>
                    </Box>
                </TableCell>
                <TableCell>{driver.Constructor.name}</TableCell>
                <TableCell>{driver.Time?.millis ? formatMillisToTime(driver.Time.millis) : 'N/A'}</TableCell>
            </>
        );
    };

    return (
        <PaginatedTable
            headers={headers}
            data={drivers}
            rowsPerPage={10}
            renderRow={renderRow}
            fixedHeight={430}
        />
    );
};

export default RaceResultsTable;
