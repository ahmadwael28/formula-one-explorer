import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';
import { IconButton, Tooltip, Typography, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PushPinIcon from '@mui/icons-material/PushPin';
import FlagIcon from '@mui/icons-material/Flag';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import moment from 'moment';

// Define props structure for the RaceCard component
interface RaceCardProps {
    seasonId: string;
    race: {
        round: string;
        raceName: string;
        Circuit: { circuitName: string; Location: { country: string; lat: string; long: string } };
        date: string;
        url: string;
    };
    togglePinCallback: () => void;
}

const RaceCard: React.FC<RaceCardProps> = ({ seasonId, race, togglePinCallback }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    // Key for storing pinned races in localStorage
    const pinnedRacesKey = `pinnedRaces_${seasonId}`;
    // Retrieve pinned races from localStorage to check if this race is pinned
    const pinnedRaces = JSON.parse(localStorage.getItem(pinnedRacesKey) || '[]');
    const isPinned = pinnedRaces.includes(race.round);

    // Opens the race's Wikipedia page in a new tab
    const openWikipediaLink = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevents the card click event
        window.open(race.url, '_blank', 'noopener,noreferrer');
    };

    // Opens the race circuit location in Google Maps
    const openMap = (e: React.MouseEvent) => {
        e.stopPropagation();
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${race.Circuit.Location.lat},${race.Circuit.Location.long}`;
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    };

    // Toggles the pin status of the race
    const handlePinToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        togglePinCallback();
    };

    // Navigates to the detailed page of the race when the card is clicked
    const handleCardClick = () => {
        navigate(`/season/race/${seasonId}/${race.round}`);
    };

    return (
        <div className={classes.card} onClick={handleCardClick}>
            {/* Background layer for styling */}
            <div className={classes.background} />
            {/* Overlay layer containing race details and actions */}
            <div className={classes.overlay}>
                {/* Display the race name */}
                <Typography className={classes.raceName}>{race.raceName}</Typography>

                {/* Circuit name section */}
                <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                    <LocationOnIcon fontSize="small" className={classes.icon} />
                    <Typography variant="body2" className={classes.responsiveText}>
                        <strong>Circuit:</strong> {race.Circuit.circuitName}
                    </Typography>
                </Box>

                {/* Race date section */}
                <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                    <EventIcon fontSize="small" className={classes.icon} />
                    <Typography variant="body2" className={classes.responsiveText}>
                        <strong>Date:</strong> {moment(race.date).format('MMMM DD, YYYY')}
                    </Typography>
                </Box>

                {/* Additional race details and action buttons */}
                <div className={classes.raceDetails}>
                    {/* Country of the race circuit */}
                    <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                        <FlagIcon fontSize="small" className={classes.icon} />
                        <Typography variant="body2" className={classes.responsiveText}>
                            <strong>Country:</strong> {race.Circuit.Location.country}
                        </Typography>
                    </Box>

                    {/* Round number of the race */}
                    <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                        <LooksOneIcon fontSize="small" className={classes.icon} />
                        <Typography variant="body2" className={classes.responsiveText}>
                            <strong>Round:</strong> {race.round}
                        </Typography>
                    </Box>

                    {/* Action buttons for Wikipedia, map, and pinning */}
                    <div className={classes.buttonContainer}>
                        {/* Open Wikipedia link */}
                        <Tooltip title="Read more about this race" arrow placement="top">
                            <IconButton onClick={openWikipediaLink} aria-label="View on Wikipedia" className={classes.buttonIcon}>
                                <OpenInNewIcon />
                            </IconButton>
                        </Tooltip>

                        {/* Open Google Maps for circuit location */}
                        <Tooltip title="View Circuit on Map" arrow placement="top">
                            <IconButton onClick={openMap} aria-label="View on Map" className={classes.buttonIcon}>
                                <MapIcon />
                            </IconButton>
                        </Tooltip>

                        {/* Pin/unpin the race */}
                        <Tooltip title={isPinned ? 'Unpin this race' : 'Pin this race'} arrow placement="top">
                            <IconButton onClick={handlePinToggle} aria-label="Pin race" className={classes.buttonIcon} style={{ color: isPinned ? 'red' : 'inherit' }}>
                                <PushPinIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RaceCard;
