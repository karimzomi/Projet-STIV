import {
  Theme, makeStyles, createStyles, withStyles,
  createMuiTheme, TableHead, TableRow, colors, AccordionSummary
} from '@material-ui/core'
import transitions from '@material-ui/core/styles/transitions';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: colors.green,
    secondary: colors.red,
  }
})
const useStylet = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        minWidth: '150px',
      }
    }
  }))
const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    root: {

      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flex: '0 0 45%'
      },
      background:'linear-gradient( 94.3deg,  rgba(26,33,64,1) 10.9%, rgba(81,84,115,1) 87.1% )',
      boxShadow: "0px 0px 5px 5px rgba(26,33,64,1)",
      width: 'fit-content',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: '15px',
      padding: '10px',

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
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
      }
    },
  }),
)(TableRow);

const StyledAccordionHead = withStyles({

  root: {
    background: 'linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)'

  },
  // expanded:{
  //   '& .MuiAccordionSummary-expandIcon':{
  //     color:'black'
  //   }
  // }
}
)(AccordionSummary)
const StyledTableHead = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'black',
    },
  }),
)(TableHead);

export { StyledTableHead, theme, useStyles, StyledTableRow, useStylet, StyledAccordionHead }