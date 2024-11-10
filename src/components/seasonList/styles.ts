// src/components/SeasonList/styles.ts
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    listContainer: {
        padding: '0 8px',
        margin: 0,
        width: '100%', // Full width for center alignment
        maxWidth: '600px', // Optional max-width to limit the width on larger screens
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        width: '100%',
        height: '100px',
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        marginBottom: '12px',
        overflow: 'hidden',
        '&:hover': {
            transform: 'translateX(5px)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
        },
        boxSizing: 'border-box'
    },
    imageContainer: {
        width: '100px',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px 0 0 8px',
        flexShrink: 0,
    },
    listItemText: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: theme.palette.text.primary,
        flexGrow: 1,
        paddingLeft: '16px',
    },
    readMoreButton: {
        color: theme.palette.primary.main,
    },
}));

export default useStyles;
