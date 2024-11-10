// src/components/seasonCard/styles.ts
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    card: {
        position: 'relative',
        width: '100%',
        maxWidth: '325px',
        aspectRatio: '1 / 1',
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
        '&:hover $seasonText': {
            transform: 'translateY(-5px)',
        },
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'transform 0.3s ease-in-out',
        transformOrigin: 'center',
    },
    overlay: {
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '8px',
    },
    topSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    seasonText: {
        fontWeight: 'bold',
        transition: 'transform 0.3s ease',
        fontSize: '48px', // Default font size for large screens
        [theme.breakpoints.down('lg')]: {
            fontSize: '40px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '32px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px',
        },
    },
    readMoreButton: {
        color: theme.palette.primary.main,
    },
}));

export default useStyles;
