// src/components/SeasonList/styles.ts
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    listContainer: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        width: '50%', // Ensures the <ul> takes the full width of its parent
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        width: '100%', // Enforces full width within the <ul>
        height: '100px', // Fixed height for consistency
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper,
        backdropFilter: 'blur(8px)', // Add blur to the background
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        marginBottom: '12px',
        overflow: 'hidden', // Ensures no overflow beyond border-radius
        '&:hover': {
            transform: 'translateX(5px)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
        },
    },
    imageContainer: {
        width: '100px',
        height: '100%', // Full height of the list item
        backgroundImage: 'url(/assets/RaceFlag.jpg)', // Ensure path matches your file structure
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px 0 0 8px', // Rounded left corners to match list item
        flexShrink: 0, // Prevent image from shrinking
    },
    listItemText: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: theme.palette.text.primary,
        flexGrow: 1, // Allows text to take up available space between image and button
        paddingLeft: '16px', // Space between image and text
    },
    readMoreButton: {
        color: theme.palette.primary.main,
    },
}));

export default useStyles;
