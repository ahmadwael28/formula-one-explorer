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
    const classes = useStyles();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleRaceClick = () => {
        navigate(`/race/${race.round}`);
    };

    const openWikipediaLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(race.url, '_blank', 'noopener,noreferrer');
    };

    const openMap = (e: React.MouseEvent) => {
        e.stopPropagation();
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${race.Circuit.Location.lat},${race.Circuit.Location.long}`;
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <li className={classes.listItem} onClick={handleRaceClick}>
            <div className={classes.imageContainer} />
            <div className={classes.listItemTextContainer}>
                <Typography variant="h6" className={classes.raceName}>
                    {race.raceName}
                </Typography>
                <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                    <LocationOnIcon fontSize="small" className={classes.icon} />
                    <Typography variant="body2">
                        <strong>Circuit:</strong> {race.Circuit.circuitName}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" className={classes.summaryInfo}>
                    <EventIcon fontSize="small" className={classes.icon} />
                    <Typography variant="body2">
                        <strong>Date:</strong> {moment(race.date).format('MMMM DD, YYYY')}
                    </Typography>
                </Box>
                {isExpanded && (
                    <div className={classes.raceDetails}>
                        <Box display="flex" alignItems="center">
                            <FlagIcon fontSize="small" className={classes.icon} />
                            <Typography variant="body2">
                                <strong>Country:</strong> {race.Circuit.Location.country}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <LooksOneIcon fontSize="small" className={classes.icon} />
                            <Typography variant="body2">
                                <strong>Round:</strong> {race.round}
                            </Typography>
                        </Box>
                        {/* Action Buttons */}
                        <div className={classes.buttonContainer}>
                            <Tooltip title="Read more about this race" arrow>
                                <IconButton className={classes.readMoreButton} onClick={openWikipediaLink}>
                                    <OpenInNewIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="View on Map" arrow>
                                <IconButton className={classes.readMoreButton} onClick={openMap}>
                                    <MapIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                )}
                {/* Show More / Show Less Button */}
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
