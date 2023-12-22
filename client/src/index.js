import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './components/App';
import theme from './components/theme';

ReactDOM.render(
          <React.StrictMode>
          <ThemeProvider theme={theme}>
          <App />
          </ThemeProvider>
          </React.StrictMode>,
          document.getElementById("root")
)