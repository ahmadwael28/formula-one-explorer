import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    listItem: {
        display: 'flex',
        alignItems: 'flex-start',
        cursor: 'pointer',
        padding: 0,
        marginBottom: '12px',
        minHeight: '200px',
        width: '100%',
        maxWidth: '1057px',
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        overflow: 'hidden',
        '&:hover': {
            transform: 'translateX(5px)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
        },
    },
    imageContainer: {
        width: '120px',
        minHeight: '200px',
        backgroundImage: 'url(/assets/RaceFlag.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexShrink: 0,
    },
    listItemTextContainer: {
        flexGrow: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    raceName: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginBottom: '8px',
    },
    summaryInfo: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem',
        marginBottom: '4px',
        '& > *': {
            marginRight: '6px',
        },
    },
    raceDetails: {
        marginTop: '8px',
        fontSize: '1rem',
        '& > div': {
            marginBottom: '8px',
        },
    },
    icon: {
        color: theme.palette.primary.main,
        marginRight: '4px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        paddingTop: '8px',
        paddingBottom: '8px',
        borderTop: `1px solid ${theme.palette.divider}`,
    },
    readMoreButton: {
        color: theme.palette.primary.main,
    },
    toggleButton: {
        color: theme.palette.primary.main,
        alignSelf: 'center',
        fontSize: '0.9rem',
    },
    toggleButtonExpanded: {
        marginTop: 'auto',
    },
}));

export default useStyles;
