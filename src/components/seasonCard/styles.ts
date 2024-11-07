// src/components/seasonCard/styles.ts
// import { makeStyles } from '@mui/styles';
// import { Theme } from '@mui/material/styles';

// export const useStyles = makeStyles((theme: Theme) => ({
//     card: {
//         position: 'relative',
//         width: '16%', // Reduced width for smaller size
//         height: '16vw', // Reduced height to maintain square shape
//         margin: '1%',
//         cursor: 'pointer',
//         borderRadius: '8px',
//         overflow: 'hidden',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         transition: 'transform 0.3s ease', // Smooth transition for card hover effect
//         '&:hover $background': {
//             transform: 'scale(1.3) rotate(-5deg)', // Increased zoom with counterclockwise rotation
//         },
//         '&:hover $seasonText': {
//             transform: 'translateY(-5px)', // Move season text slightly upwards on hover
//         },
//     },
//     background: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundImage: 'url(/assets/RaceFlag.jpg)', // Ensure path matches your file structure
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         transition: 'transform 0.3s ease-in-out', // Smooth animation
//         transformOrigin: 'center', // Rotate around the center of the image
//     },
//     overlay: {
//         position: 'relative',
//         zIndex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
//         color: 'white',
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         padding: '8px',
//     },
//     seasonText: {
//         fontSize: '48px',
//         fontWeight: 'bold',
//         transition: 'transform 0.3s ease', // Smooth transition for text movement
//     },
//     readMoreButton: {
//         color: theme.palette.primary.main,
//         alignSelf: 'flex-end',
//     },
// }));

// export default useStyles;



// src/components/seasonCard/styles.ts
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    card: {
        position: 'relative',
        width: '16%',
        height: '16vw',
        margin: '1%',
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
        backgroundImage: 'url(/assets/RaceFlag.jpg)',
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
        fontSize: '48px',
        fontWeight: 'bold',
        transition: 'transform 0.3s ease',
    },
    readMoreButton: {
        color: theme.palette.primary.main,
    },
}));

export default useStyles;
