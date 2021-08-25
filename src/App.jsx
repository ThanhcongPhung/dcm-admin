import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import store from './redux/store';
import AppRouter from './router';
import theme from './styles/theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <StyledThemeProvider theme={theme}>
          <Provider store={store()}>
            <SnackbarProvider>
              <AppRouter />
            </SnackbarProvider>
          </Provider>
        </StyledThemeProvider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}
export default App;
