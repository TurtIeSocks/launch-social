import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ED1A7A',
      main: '#ED1A7A',
      dark: '#ED1A7A',
      contrastText: '#fff',
    },
    secondary: {
      light: '#49AEB9',
      main: '#49AEB9',
      dark: '#49AEB9',
      contrastText: '#fff',
    }
  }
});
theme = responsiveFontSizes(theme)

export default theme