import {
  Theme, makeStyles, createStyles, withStyles,
  createMuiTheme, TableHead, TableRow, colors
} from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: colors.red,
    secondary: colors.green,
  }
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    root: {

      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flex: '0 0 45%'
      },
      boxShadow: "0px 0px 5px 5px black",
      border: '1px solid white',
      width: 'fit-content',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin:'15px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    container: {
      padding: theme.spacing(2)
    },
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

export { StyledTableHead, theme, useStyles, StyledTableRow }