import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface MainContainerProps {
    children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detects mobile screen size

    return (
        <div
            style={{
                height: '100vh', // Full viewport height
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/F1background.jpg)`, // Background image from public folder
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dim overlay for background image
                    zIndex: 0,
                }}
            />
            <div
                className="main-container"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: isMobileScreen ? '0 1rem' : '0 2rem', // Conditional padding for mobile screens
                    flex: 1,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default MainContainer;

