import {
  Theme, makeStyles, createStyles, withStyles,
  createMuiTheme, TableHead, TableRow,colors
} from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    type:'dark',
    primary:colors.red,
    secondary:colors.yellow,
  }
})
const themeL = createMuiTheme({
  palette: {
    type: 'light'
  }
})
const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    container: {
      padding: theme.spacing(2)
    }
  }),
);
const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const StyledTableHead = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'black',
    },
  }),
)(TableHead);

export { StyledTableHead, theme, useStyles, StyledTableRow, themeL }