// src/components/raceResultsTable/RaceResultsTable.tsx

import React from 'react';
import { TableCell } from '@mui/material';
import PaginatedTable from '../common/paginatedTable/PaginatedTable';
import moment from 'moment';

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

    return (
        <PaginatedTable
            headers={headers}
            data={drivers}
            rowsPerPage={10}
            renderRow={renderRow}
            fixedHeight={500}
        />
    );
};

export default RaceResultsTable;
