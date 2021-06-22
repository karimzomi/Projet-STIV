import { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import {
    Box, Collapse, Checkbox, IconButton,
    Paper, TableBody,
    Table, TableCell, TableContainer,
    ThemeProvider, Button, TextField, MenuItem
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { StyledTableHead, StyledTableRow, theme,useStyles } from '../materialcustom/Fcs'


async function fetcher(API_URL) {
    const Data = await fetch(API_URL, { method: "GET" })
    const res = await Data.json()
    return res
}
async function AddTrajet() {
    // const data = await axios.post("http://localhost:3000/api/Trajet", {
    //     Prix,
    //     Route,
    //     Ville_arr,
    //     Ville_dep
    // })
    // const data = await fetch("http://localhost:3000/api/Trajet", {
    //     method: "POST",
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         Prix,
    //         Route,
    //         Ville_arr,
    //         Ville_dep
    //     })
    // })
}
async function DeleteElements(params) {
    const data = await axios.delete("http://localhost:3000/api/Trajet", {
        data: {
            params
        }
    })
    // const data = await fetch("http://localhost:3000/api/Trajet", {
    //     method: "DELETE",
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(params)
    // })

}
function Row(props) {
    const [open, setOpen] = useState(false);
    const [select, setselect] = useState(false);
    const data = props.data
    const Counter = props.Counter
    const SetCounter = props.SetCounter
    const SelectedList: Array<any> = props.SelectedList
    const SetSelectedList = props.SetSelectedList


    const AddItem = () => {
        var List = SelectedList
        if (select) {
            setselect(false)
            SetCounter(Counter - 1)
            SetSelectedList(List.filter((item) => item !== data.code))
        }
        else {
            setselect(true)
            SetCounter(Counter + 1)
            SetSelectedList(List.concat([data.code]))
        }
    }
    return (
        <>
            <StyledTableRow hover selected={select} key={data.code}>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={select}
                        onClick={AddItem}
                    />
                </TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center" >{data.code}</TableCell>
                <TableCell align="center">{data.bus_id}</TableCell>
                <TableCell align="center">{data.ville_trajet_id_depToville.nom}</TableCell>
                <TableCell align="center">{data.ville_trajet_id_arrToville.nom}</TableCell>
                <TableCell align="center">{data.hd}</TableCell>
                <TableCell align="center">{data.ha}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <p>Sup</p>
                        </Box>
                    </Collapse>
                </TableCell>
            </StyledTableRow>
        </>
    )
}

function Trajet() {
    const [Name, setName] = useState("")
    const [Counter, SetCounter] = useState(0)
    const [SelectedList, SetSelectedList] = useState([])
    const [FormCompo, SetFormCompo] = useState(null)
    const { data, error } = useSWR("http://localhost:3000/api/Trajet", fetcher, { revalidateOnFocus: false });

    const Form = () => {
        const classes = useStyles()
        return (
            <form className={classes.root} onSubmit={(e)=>AddTrajet(e)} >
                <TextField
                    select
                    label="Bus"
                    helperText="Select Bus Id"
                    color="secondary"
                    variant="outlined"
                >
                    {
                        data.Bus.map((element) => {
                            return <MenuItem key={element.id} value={element.id} 
                                disabled={element.etat !== "disponible"}>
                                {element.id}
                            </MenuItem>
                        })
                    }

                </TextField>
                <TextField
                    select
                    label="Ville"
                    helperText="Select Bus Id"
                    color="secondary"
                    variant="outlined"
                >
                    {
                        data.ville.map((element) => {
                            return <MenuItem key={element.id} value={element.nom} >
                                {element.nom}
                            </MenuItem>
                        })
                    }

                </TextField>
                <TextField
                    select
                    label="Ville"
                    helperText="Select Bus Id"
                    color="secondary"
                    variant="outlined"
                >
                    {
                        data.ville.map((element) => {
                            return <MenuItem key={element.id} value={element.nom} >
                                {element.nom}
                            </MenuItem>
                        })
                    }

                </TextField>
            </form>)
    }


    if (error) {
        return <h1>Error</h1>
    }

    if (!data) {
        return <p>loading...</p>
    }
    else {

        return (
            <ThemeProvider theme={theme}>
                <Box m={"15px"}>
                    <Paper variant="outlined">
                        <TableContainer >
                            <Table stickyHeader>
                                <StyledTableHead>
                                    <StyledTableRow>
                                        <TableCell align="center" padding="checkbox" >
                                            {Counter}
                                        </TableCell>
                                        <TableCell align="center" >Info</TableCell>
                                        <TableCell align="center" >ID</TableCell>
                                        <TableCell align="center" >Bus_id</TableCell>
                                        <TableCell align="center">ville_dep</TableCell>
                                        <TableCell align="center">ville_des</TableCell>
                                        <TableCell align="center">hd</TableCell>
                                        <TableCell align="center">ha</TableCell>
                                    </StyledTableRow>
                                </StyledTableHead>
                                <TableBody >
                                    {data.Trajets.map((element) => <Row data={element} Counter={Counter} SetCounter={SetCounter} SetSelectedList={SetSelectedList} SelectedList={SelectedList} />)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
                <Box m={'15px'} display="flex" justifyContent="flex-end" alignItems="center" alignContent="flex-end" p={1} >
                    <IconButton
                        onClick={() => {
                            if (!FormCompo) {
                                SetFormCompo(<Form />)
                            }
                        }} color={'secondary'} >
                        <AddIcon />
                    </IconButton>

                    <Button
                        disabled={Counter == 0}
                        startIcon={<DeleteIcon />}
                        color="primary"
                        variant="outlined"
                        onClick={() => DeleteElements(SelectedList)}
                    >
                        Delete
                </Button>
                </Box>
                {FormCompo}
            </ThemeProvider >
        )
    }

}
export default Trajet