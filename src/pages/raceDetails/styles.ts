import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        paddingTop: '1rem',
        color: theme.palette.text.primary,
    },
    title: {
        fontSize: '52px',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#ffffff',
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
    },
    toggleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '16px',
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
        },
    },
    loadingContainer: {
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    errorContainer: {
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    subtitle: {
        color: theme.palette.text.secondary,
        marginBottom: theme.breakpoints.down('sm') ? '8px' : '0',
    },
}));

export default useStyles;
