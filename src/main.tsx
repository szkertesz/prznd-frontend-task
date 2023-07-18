import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createTheme,
    ThemeProvider,
    responsiveFontSizes,
} from '@mui/material/styles';

import App from './App.tsx';
import './index.css';

let theme = createTheme({
    typography: {
        fontFamily: 'roboto',
    },
    palette: {
        contrastThreshold: 4.5,
    },
});

theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
