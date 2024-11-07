// src/theme.ts
import { createTheme } from '@mui/material/styles';
import './theme'; // Ensure the custom theme definitions are loaded

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
            darkIcon: '#333333', // Custom color for icons on light backgrounds
        },
    },
});

export default theme;
