import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';
import { IconButton, Tooltip, Typography, Box, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PushPinIcon from '@mui/icons-material/PushPin';
import moment from 'moment';

interface RaceCardProps {
    seasonId: string;
    race: {
        round: string;
        raceName: string;
        Circuit: { circuitName: string; Location: { country: string; lat: string; long: string } };
        date: string;
        url: string;
    };
    togglePinCallback: () => void; // Callback to trigger sorting and notification in parent component
}

const RaceCard: React.FC<RaceCardProps> = ({ seasonId, race, togglePinCallback }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);
    const pinnedRacesKey = `pinnedRaces_${seasonId}`;
    const pinnedRaces = JSON.parse(localStorage.getItem(pinnedRacesKey) || '[]');
    const isPinned = pinnedRaces.includes(race.round);

    const openWikipediaLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(race.url, '_blank', 'noopener,noreferrer');
    };

    const openMap = (e: React.MouseEvent) => {
        e.stopPropagation();
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${race.Circuit.Location.lat},${race.Circuit.Location.long}`;
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    };

    const handlePinToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        const updatedPinnedRaces = isPinned
            ? pinnedRaces.filter((round: string) => round !== race.round)
            : [...pinnedRaces, race.round];
        localStorage.setItem(pinnedRacesKey, JSON.stringify(updatedPinnedRaces));
        togglePinCallback();
    };

    const handleCardClick = () => {
        navigate(`/season/race/${seasonId}/${race.round}`);
    };

    return (
        <div className={classes.card} onClick={handleCardClick}>
            <div className={classes.background} />
            <div className={`${classes.overlay} ${showDetails ? classes.overlayExpanded : ''}`}>
                <Button
                    className={classes.toggleButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowDetails((prev) => !prev);
                    }}
                    startIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                    {showDetails ? 'Show Less' : 'Show More'}
                </Button>

                <Typography className={classes.raceName}>{race.raceName}</Typography>
                <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                    <LocationOnIcon fontSize="small" className={classes.icon} />
                    <Typography variant="body2" className={classes.responsiveText}>
                        <strong>Circuit:</strong> {race.Circuit.circuitName}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                    <EventIcon fontSize="small" className={classes.icon} />
                    <Typography variant="body2" className={classes.responsiveText}>
                        <strong>Date:</strong> {moment(race.date).format('MMMM DD, YYYY')}
                    </Typography>
                </Box>

                {showDetails && (
                    <div className={classes.raceDetails}>
                        <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                            <Typography variant="body2" className={classes.responsiveText}>
                                <strong>Country:</strong> {race.Circuit.Location.country}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                            <Typography variant="body2" className={classes.responsiveText}>
                                <strong>Round:</strong> {race.round}
                            </Typography>
                        </Box>
                        <div className={classes.buttonContainer}>
                            <Tooltip title="Read more about this race" arrow placement="top">
                                <IconButton onClick={openWikipediaLink} aria-label="View on Wikipedia" className={classes.buttonIcon}>
                                    <OpenInNewIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="View Circuit on Map" arrow placement="top">
                                <IconButton onClick={openMap} aria-label="View on Map" className={classes.buttonIcon}>
                                    <MapIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={isPinned ? 'Unpin this race' : 'Pin this race'} arrow placement="top">
                                <IconButton onClick={handlePinToggle} aria-label="Pin race" className={classes.buttonIcon} style={{ color: isPinned ? 'red' : 'inherit' }}>
                                    <PushPinIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RaceCard;
