// // src/App.tsx
// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import AppRoutes from './routes/AppRouter';
// import MainContainer from './components/MainContainer';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <AppBar position="static">
//         <Toolbar style={{ height: "7vh" }}>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Formula One Explorer
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <MainContainer>
//         <AppRoutes />
//       </MainContainer>
//     </Router>
//   );
// };

// export default App;


// src/App.tsx
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
