import React from 'react';
import { TableCell, IconButton, Tooltip } from '@mui/material';
import PinIcon from '@mui/icons-material/PushPin';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MapIcon from '@mui/icons-material/Map';
import PaginatedTable from '../common/paginatedTable/PaginatedTable';

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

interface SeasonRacesTableProps {
    races: Race[];
    onRowClick: (race: Race) => void;
    onTogglePin: (race: Race) => void;
    pinnedRaces: string[];
}

const SeasonRacesTable: React.FC<SeasonRacesTableProps> = ({ races, onRowClick, onTogglePin, pinnedRaces }) => {
    const headers = ['Round', 'Race Name', 'Circuit', 'Date', "Actions"];

    const renderRaceRow = (race: Race) => (
        <>
            <TableCell>{race.round}</TableCell>
            <TableCell>{race.raceName}</TableCell>
            <TableCell>{race.Circuit.circuitName}</TableCell>
            <TableCell>{new Date(race.date).toLocaleDateString()}</TableCell>
        </>
    );

    const renderActions = (race: Race) => {
        const isPinned = pinnedRaces.includes(race.round);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${race.Circuit.Location.lat},${race.Circuit.Location.long}`;

        return (
            <div style={{ width: "max-content" }}>
                <Tooltip title={isPinned ? 'Unpin Race' : 'Pin Race'}>
                    <IconButton onClick={(e) => { e.stopPropagation(); onTogglePin(race); }} color={isPinned ? 'error' : 'default'}>
                        <PinIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="View Details">
                    <IconButton onClick={(e) => { e.stopPropagation(); window.open(race.url, '_blank', 'noopener,noreferrer') }}>
                        <OpenInNewIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="View on Map">
                    <IconButton onClick={(e) => { e.stopPropagation(); window.open(googleMapsUrl, '_blank', 'noopener,noreferrer') }}>
                        <MapIcon />
                    </IconButton>
                </Tooltip>
            </ div>
        );
    };

    return (
        <PaginatedTable
            headers={headers}
            data={races}
            rowsPerPage={10}
            renderRow={renderRaceRow}
            actions={renderActions}
            onRowClick={onRowClick}
            fixedHeight={550}
        />
    );
};

export default SeasonRacesTable;
