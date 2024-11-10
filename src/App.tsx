import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';
import MainContainer from './components/MainContainer';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainContainer>
          <AppRoutes />
        </MainContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
