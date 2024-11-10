import { createTheme } from '@mui/material/styles';
import './theme';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#e0e0e0',
        },
        background: {
            default: 'rgba(255, 255, 255, 0.1)',
            paper: 'rgba(255, 255, 255, 0.15)',
        },
        text: {
            primary: '#ffffff',
            secondary: '#e0e0e0',
        },
        custom: {
            darkIcon: '#333333',
        },
    },
});

export default theme;
