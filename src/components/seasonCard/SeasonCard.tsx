// src/components/seasonCard/SeasonCard.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useStyles } from './styles';
// import { IconButton, Tooltip } from '@mui/material';
// import BookIcon from '@mui/icons-material/Book';

// interface SeasonCardProps {
//     season: { season: string; url: string };
// }

// const SeasonCard: React.FC<SeasonCardProps> = ({ season }) => {
//     const classes = useStyles();
//     const navigate = useNavigate();

//     const handleCardClick = () => {
//         navigate(`/season/${season.season}`);
//     };

//     const openWikipediaLink = (e: React.MouseEvent) => {
//         e.stopPropagation(); // Prevent card click from triggering
//         window.open(season.url, '_blank', 'noopener,noreferrer'); // Open link in a new tab
//     };

//     return (
//         <div onClick={handleCardClick} className={classes.card}>
//             <div className={classes.background} />
//             <div className={classes.overlay}>
//                 <span className={classes.seasonText}>{season.season}</span>
//                 <Tooltip title="Read more about this season" arrow placement="top">
//                     <IconButton
//                         className={classes.readMoreButton}
//                         onClick={openWikipediaLink}
//                         aria-label="Read more"
//                     >
//                         <BookIcon fontSize="small" />
//                     </IconButton>
//                 </Tooltip>
//             </div>
//         </div>
//     );
// };

// export default SeasonCard;


// src/components/seasonCard/SeasonCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';
import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface SeasonCardProps {
    season: { season: string; url: string };
}

const SeasonCard: React.FC<SeasonCardProps> = ({ season }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/season/${season.season}`);
    };

    const openWikipediaLink = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click from triggering
        window.open(season.url, '_blank', 'noopener,noreferrer'); // Open link in a new tab
    };

    return (
        <div onClick={handleCardClick} className={classes.card}>
            <div className={classes.background} />
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
