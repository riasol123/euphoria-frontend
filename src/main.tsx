import { CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import store from './redux/store.ts';
import './style.css';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>
);
