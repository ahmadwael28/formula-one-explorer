import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Tooltip, Typography, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MapIcon from '@mui/icons-material/Map';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import EventIcon from '@mui/icons-material/Event';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import moment from 'moment';
import { useStyles } from './styles';

// Define the structure of props for the component
interface RaceListItemProps {
    race: {
        round: string;
        raceName: string;
        Circuit: {
            circuitName: string;
            Location: { country: string; lat: string; long: string };
        };
        date: string;
        url: string;
    };
}

const RaceListItem: React.FC<RaceListItemProps> = ({ race }) => {
    const classes = useStyles();  // Load custom styles
    const navigate = useNavigate();  // Enable navigation
    const [isExpanded, setIsExpanded] = useState(false);  // Track if additional race details are expanded

    // Navigate to detailed race page on click
    const handleRaceClick = () => {
        navigate(`/race/${race.round}`);
    };

    // Open the race Wikipedia page in a new tab
    const openWikipediaLink = (e: React.MouseEvent) => {
        e.stopPropagation();  // Prevent triggering the list item click event
        window.open(race.url, '_blank', 'noopener,noreferrer');
    };

    // Open the race location in Google Maps
    const openMap = (e: React.MouseEvent) => {
        e.stopPropagation();
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${race.Circuit.Location.lat},${race.Circuit.Location.long}`;
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <li className={classes.listItem} onClick={handleRaceClick}>
            {/* Display race image or placeholder */}
            <div className={classes.imageContainer} />

            {/* Container for race information */}
            <div className={classes.listItemTextContainer}>
                {/* Display race name */}
                <Typography variant="h6" className={classes.raceName}>
                    {race.raceName}
                </Typography>

                {/* Display circuit name with icon */}
                <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                    <LocationOnIcon fontSize="small" className={classes.icon} />
                    <Typography variant="body2">
                        <strong>Circuit:</strong> {race.Circuit.circuitName}
                    </Typography>
                </Box>

                {/* Display race date with icon */}
                <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                    <EventIcon fontSize="small" className={classes.icon} />
                    <Typography variant="body2">
                        <strong>Date:</strong> {moment(race.date).format('MMMM DD, YYYY')}
                    </Typography>
                </Box>

                {/* Expandable section for additional race details */}
                {isExpanded && (
                    <div className={classes.raceDetails}>
                        {/* Display country with icon */}
                        <Box display="flex" alignItems="center">
                            <FlagIcon fontSize="small" className={classes.icon} />
                            <Typography variant="body2">
                                <strong>Country:</strong> {race.Circuit.Location.country}
                            </Typography>
                        </Box>

                        {/* Display round number with icon */}
                        <Box display="flex" alignItems="center">
                            <LooksOneIcon fontSize="small" className={classes.icon} />
                            <Typography variant="body2">
                                <strong>Round:</strong> {race.round}
                            </Typography>
                        </Box>

                        {/* Action buttons for more information and map */}
                        <div className={classes.buttonContainer}>
                            {/* Open Wikipedia link */}
                            <Tooltip title="Read more about this race" arrow>
                                <IconButton className={classes.readMoreButton} onClick={openWikipediaLink}>
                                    <OpenInNewIcon />
                                </IconButton>
                            </Tooltip>

                            {/* Open Google Maps link */}
                            <Tooltip title="View on Map" arrow>
                                <IconButton className={classes.readMoreButton} onClick={openMap}>
                                    <MapIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                )}

                {/* Toggle button for expanding/collapsing details */}
                <Button
                    className={`${classes.toggleButton} ${isExpanded ? classes.toggleButtonExpanded : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                    startIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
            </div>
        </li>
    );
};

export default RaceListItem;
