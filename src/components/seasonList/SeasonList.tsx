import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { IconButton, Tooltip, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import seasonBackgroundImages from '../../pages/seasonListing/SeasonBackgroundImages';

interface SeasonListProps {
    seasons: { season: string; url: string }[];
}

const SeasonList: React.FC<SeasonListProps> = ({ seasons }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const handleSeasonClick = (season: string) => {
        navigate(`/season/${season}`);
    };

    const openWikipediaLink = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box display="flex" justifyContent="center">
            <ul className={classes.listContainer}>
                {seasons.map((season, index) => (
                    <li
                        key={season.season}
                        className={classes.listItem}
                        onClick={() => handleSeasonClick(season.season)}
                    >
                        <div className={classes.imageContainer} style={{ backgroundImage: `url(${seasonBackgroundImages[index % seasonBackgroundImages.length]})` }} />
                        <span className={classes.listItemText}>Season {season.season}</span>
                        <Tooltip title="Read more about this season" arrow placement="top">
                            <IconButton
                                className={classes.readMoreButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openWikipediaLink(season.url);
                                }}
                                aria-label="Read more"
                            >
                                <OpenInNewIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default SeasonList;
