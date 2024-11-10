import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';
import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import seasonBackgroundImages from '../../pages/seasonListing/SeasonBackgroundImages';

interface SeasonCardProps {
    season: { season: string; url: string };
    index: number;
}

const SeasonCard: React.FC<SeasonCardProps> = ({ season, index }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/season/${season.season}`);
    };

    const openWikipediaLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(season.url, '_blank', 'noopener,noreferrer');
    };

    // Select background image based on index, cycling if more cards than images
    const backgroundImage = seasonBackgroundImages[index % seasonBackgroundImages.length];

    return (
        <div onClick={handleCardClick} className={classes.card}>
            <div
                className={classes.background}
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className={classes.overlay}>
                <div className={classes.topSection}>
                    <span className={classes.seasonText}>{season.season}</span>
                    <Tooltip title="Read more about this season" arrow placement="top">
                        <IconButton
                            className={classes.readMoreButton}
                            onClick={openWikipediaLink}
                            aria-label="Read more"
                        >
                            <OpenInNewIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default SeasonCard;
