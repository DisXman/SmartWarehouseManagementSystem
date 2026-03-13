import React from 'react';
import Dashboard from './pages/Dashboard';
import { CssBaseline, ThemeProvider, createTheme, Box, AppBar, Toolbar, Typography } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', 
        },
        background: {
            default: '#f4f6f8',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Dashboard />
            </Box>
        </ThemeProvider>
    );
}

export default App;