import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.text.primary,
        paddingTop: '1rem',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowY: 'hidden',
    },
    header: {
        fontSize: '52px',
        fontWeight: 'bold',
        color: theme.palette.text.secondary,
        marginBottom: '8px',
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
    },
    toggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
        },
    },
    loadingContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animationContainer: {
        opacity: 1,
        transition: 'opacity 0.5s ease',
        height: 'calc(100vh - 360px)',
        overflowY: 'auto',
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px',
    },
    snackbarContent: {
        '& .MuiSnackbarContent-root': {
            backdropFilter: 'blur(10px)',
            color: theme.palette.text.primary,
            fontWeight: 'bold',
            borderRadius: '8px',
            padding: '8px 16px',
        },
    },
}));

export default useStyles;


