import { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import {
    Box, Checkbox, IconButton,
    Paper, TableBody,
    Table, TableCell, TableContainer,
    ThemeProvider, Button, TextField, MenuItem
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import ExitToApp from '@material-ui/icons/ExitToApp';
import { StyledTableHead, StyledTableRow, theme, useStyles } from '../materialcustom/Fcs'


async function fetcher(API_URL) {
    const Data = await fetch(API_URL, { method: "GET" })
    const res = await Data.json()
    return res
}


function Row(props) {
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
                <TableCell align="center" >{data.code}</TableCell>
                <TableCell align="center">{data.bus_id}</TableCell>
                <TableCell align="center">{data.ville_trajet_id_depToville.nom}</TableCell>
                <TableCell align="center">{data.ville_trajet_id_arrToville.nom}</TableCell>
                <TableCell align="center">{data.hd}</TableCell>
                <TableCell align="center">{data.ha}</TableCell>
            </StyledTableRow>

        </>
    )
}
async function AddTrajet(props) {
    const res = await axios.post("http://localhost:3000/api/Trajet", props)
}
function Trajet() {

    const [Counter, SetCounter] = useState(0)
    const [SelectedList, SetSelectedList] = useState([])
    const [FormCompo, SetFormCompo] = useState(null)
    const { data, error } = useSWR("http://localhost:3000/api/Trajet", fetcher, { refreshInterval: 2 });
    async function DeleteElements(params) {
        const data = await axios.delete("http://localhost:3000/api/Trajet", {
            data: {
                params
            }
        })
        SetCounter(0)
        SetSelectedList([])

        // const data = await fetch("http://localhost:3000/api/Trajet", {
        //     method: "DELETE",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(params)
        // })

    }
    const Form = () => {
        const classes = useStyles()
        const [Villedep, setVilledep] = useState<String>()
        const [Villearr, setVillearr] = useState<String>()
        const [Bus, setBus] = useState<String>()
        const [ha, setha] = useState<String>()
        const [hd, sethd] = useState<String>()
        return (
            <form className={classes.root} onSubmit={(e) => {
                e.preventDefault()
                AddTrajet({ Bus, Villedep, Villearr, ha, hd })
                SetFormCompo(null)
            }} >
                <TextField
                    select
                    label="Bus"
                    helperText="Select Bus Id"
                    value={Bus}
                    onChange={(e) => setBus(e.target.value)}
                >
                    {
                        data.Bus.map((element) => {
                            return <MenuItem key={element.id} value={element.id}
                                disabled={element.etat !== "disponible"}
                            >
                                {element.id}
                            </MenuItem>
                        })
                    }

                </TextField>
                <TextField
                    select
                    label="Ville_départ"
                    helperText="Select Ville de départ"
                >
                    {
                        data.ville.map((element) => {
                            return <MenuItem
                                key={element.code}
                                value={element.nom}
                                disabled={element.code == Villearr}
                                onClick={(e) => {
                                    setVilledep(element.code)
                                }}
                            >
                                {element.nom}
                            </MenuItem>
                        })
                    }

                </TextField>
                <TextField
                    select
                    label="Ville_arrivée"
                    helperText="Select Ville d'arrivée"
                >
                    {
                        data.ville.map((element) => {
                            return <MenuItem key={element.code}
                                value={element.nom}
                                disabled={element.code == Villedep}
                                onClick={(e) => setVillearr(element.code)}
                            >
                                {element.nom}
                            </MenuItem>
                        })
                    }

                </TextField>
                <TextField
                    label="heure_de_départ"
                    helperText="AAAA-MM-JJ HH:MM:SS"
                    inputProps={{ pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}' }}
                    value={hd}
                    onChange={(e) => sethd(e.target.value)}
                />
                <TextField
                    label="heure_d'arrivée"
                    helperText="AAAA-MM-JJ HH:MM:SS"
                    inputProps={{ pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}' }}
                    value={ha}
                    onChange={(e) => setha(e.target.value)}
                />

                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    type="submit"
                    variant="outlined"
                    disabled={!ha || !hd || !Villearr || !Villedep || !Bus}
                >
                    Add
                </Button>
                <Button
                    style={{ margin: "0px 10px" }}
                    startIcon={<ExitToApp />}
                    variant="outlined"
                    color="secondary"
                    onClick={() => SetFormCompo(null)}>
                    Hide
                </Button>
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
                                        <TableCell align="center" >ID</TableCell>
                                        <TableCell align="center" >Bus_id</TableCell>
                                        <TableCell align="center">Ville_départ</TableCell>
                                        <TableCell align="center">Ville_arrivée</TableCell>
                                        <TableCell align="center">Heure_de_départ</TableCell>
                                        <TableCell align="center">Heure_d'arrivée</TableCell>
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
                        color="primary"
                        onClick={() => {
                            if (!FormCompo) {
                                SetFormCompo(true)
                            }
                        }}  >
                        <AddIcon />
                    </IconButton>
                        <Button
                            disabled={Counter == 0}
                            startIcon={<DeleteIcon />}
                            color="secondary"
                            variant="outlined"
                            onClick={() => DeleteElements(SelectedList)}
                        >
                            Delete
                        </Button>
                </Box>
                {FormCompo ? <Form /> : null}
            </ThemeProvider >
        )
    }

}
export default Trajet