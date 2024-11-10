import React from 'react';
import { TableCell, IconButton, Tooltip } from '@mui/material';
import PinIcon from '@mui/icons-material/PushPin';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MapIcon from '@mui/icons-material/Map';
import PaginatedTable from '../common/paginatedTable/PaginatedTable';

// Define the structure of a race object
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

// Define props for the SeasonRacesTable component
interface SeasonRacesTableProps {
    races: Race[];  // Array of races to display
    onRowClick: (race: Race) => void;  // Callback when a race row is clicked
    onTogglePin: (race: Race) => void;  // Callback to pin/unpin a race
    pinnedRaces: string[];  // Array of pinned race rounds
}

const SeasonRacesTable: React.FC<SeasonRacesTableProps> = ({ races, onRowClick, onTogglePin, pinnedRaces }) => {
    // Define column headers for the table
    const headers = ['Round', 'Race Name', 'Circuit', 'Date', "Actions"];

    // Render a single row for each race
    const renderRaceRow = (race: Race) => (
        <>
            <TableCell>{race.round}</TableCell>
            <TableCell>{race.raceName}</TableCell>
            <TableCell>{race.Circuit.circuitName}</TableCell>
            <TableCell>{new Date(race.date).toLocaleDateString()}</TableCell>
        </>
    );

    // Render action buttons for each race (Pin, View Details, Map)
    const renderActions = (race: Race) => {
        const isPinned = pinnedRaces.includes(race.round);  // Check if race is pinned
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${race.Circuit.Location.lat},${race.Circuit.Location.long}`;

        return (
            <div style={{ width: "max-content" }}>
                {/* Pin/Unpin race button */}
                <Tooltip title={isPinned ? 'Unpin Race' : 'Pin Race'}>
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); onTogglePin(race); }}
                        color={isPinned ? 'error' : 'default'}
                    >
                        <PinIcon />
                    </IconButton>
                </Tooltip>

                {/* Open race details in new tab */}
                <Tooltip title="View Details">
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); window.open(race.url, '_blank', 'noopener,noreferrer') }}
                    >
                        <OpenInNewIcon />
                    </IconButton>
                </Tooltip>

                {/* Open race location on Google Maps */}
                <Tooltip title="View on Map">
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); window.open(googleMapsUrl, '_blank', 'noopener,noreferrer') }}
                    >
                        <MapIcon />
                    </IconButton>
                </Tooltip>
            </ div>
        );
    };

    return (
        <PaginatedTable
            headers={headers}  // Pass headers to table
            data={races}  // Pass races data to table
            rowsPerPage={10}  // Set number of rows per page
            renderRow={renderRaceRow}  // Row rendering function
            actions={renderActions}  // Action rendering function
            onRowClick={onRowClick}  // Row click handler
            fixedHeight={550}  // Fixed height for table styling
        />
    );
};

export default SeasonRacesTable;
