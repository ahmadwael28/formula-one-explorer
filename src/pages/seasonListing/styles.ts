import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.text.primary,
        paddingTop: '1rem',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: "border-box",
        overflowY: "hidden",
    },
    breadcrumb: {
        marginBottom: '8px',
    },
    title: {
        fontSize: '52px',
        fontWeight: 'bold',
        color: theme.palette.text.secondary,
        marginBottom: '8px',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'left',
        },
    },
    toggleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '16px',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            textAlign: 'left',
        },
    },
    toggleButtonGroup: {
        alignSelf: 'center',
        [theme.breakpoints.up('sm')]: {
            alignSelf: 'flex-end',
        },
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 295px)',
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        transition: 'opacity 0.5s ease',
        height: 'calc(100vh - 295px)',
        overflowY: 'auto',
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px',
    },
}));

export default useStyles;
