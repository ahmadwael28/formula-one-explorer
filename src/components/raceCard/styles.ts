import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    card: {
        position: 'relative',
        width: '100%',
        maxWidth: '338px',
        aspectRatio: '1 / 1.6',
        margin: 'auto',
        cursor: 'pointer',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
        '&:hover $background': {
            transform: 'scale(1.3) rotate(-5deg)',
        },
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/assets/RaceFlag.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'transform 0.3s ease-in-out',
        transformOrigin: 'center',
    },
    overlay: {
        position: 'absolute',
        bottom: '-30%',
        left: 0,
        right: 0,
        height: '66%',
        borderRadius: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '8px',
        transform: 'translateY(-40%)',
        transition: 'background-color 0.3s ease',
        overflow: 'hidden',
    },
    raceName: {
        fontSize: "1.6rem",
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    summaryInfo: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem',
        marginBottom: '8px',
        '& > *': {
            marginRight: '4px',
        },
    },
    responsiveText: {
        fontSize: '1rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    raceDetails: {
        fontSize: '1rem',
        '& > div': {
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
        },
    },
    icon: {
        color: theme.palette.primary.main,
        marginRight: '4px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '8px',
        paddingBottom: '8px',
    },
    buttonIcon: {
        color: theme.palette.primary.main,
        margin: '0 4px',
    },
}));

export default useStyles;
