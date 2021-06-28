import { useState } from 'react'
import useSWR from 'swr'
import {
    Collapse, Checkbox, IconButton,
    Paper, Box, TableBody,
    Table, TableCell, TableContainer,
    ThemeProvider, TextField, MenuItem,
    TableRow, Button, makeStyles, Accordion, AccordionDetails, Tooltip
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { StyledTableHead, theme, useStylet, StyledAccordionHead } from '../materialcustom/Fcs'
import axios from "axios"
import { AttachMoney } from "@material-ui/icons"

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
            SetSelectedList(List.filter((item) => item !== data.id))
        }
        else {
            setselect(true)
            SetCounter(Counter + 1)
            SetSelectedList(List.concat([data.id]))
        }
    }
    return (
        <>
            <TableRow hover selected={select} key={data.id} >
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={select}
                        onClick={AddItem}
                    />
                </TableCell>

                <TableCell align="center">{data.id}</TableCell>
                <TableCell align="center">{data.ville_troncon_ville_depToville.nom}</TableCell>
                <TableCell align="center">{data.ville_troncon_ville_arrToville.nom}</TableCell>
                <TableCell align="center">{data.route.typer}</TableCell>
                <TableCell align="center">{data.prix + " DT"}</TableCell>
            </TableRow>

        </>
    )
}

function Home() {
    const [Counter, SetCounter] = useState(0)
    const [SelectedList, SetSelectedList] = useState([])
    const { data, error } = useSWR("http://localhost:3000/api/Tarif", fetcher, { refreshInterval: 2 });

    //Add Tarif
    const [Prix, setPrix] = useState(1)
    const [Ville_dep, setVille_dep] = useState(data ? data.villes[0].code : 1)
    const [Ville_arr, setVille_arr] = useState(data ? data.villes[1].code : 2)
    const [Route, setRoute] = useState(1)
    //C Tarif
    const [vd, setVd] = useState(data ? data.villes[0].code : 1)
    const [va, setVa] = useState(data ? data.villes[1].code : 2)
    const [R, setR] = useState("autoroute")
    const [result, setResult] = useState(0)

    const useStyles = makeStyles({
        root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 0px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
        },
    });
    const classes = useStylet()
    const test = useStyles()

    async function AddTarif() {
        const data = await axios.post("http://localhost:3000/api/Tarif", {
            Prix,
            Route,
            Ville_arr,
            Ville_dep
        })
        // const data = await fetch("http://localhost:3000/api/Tarif", {
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
        const data = await axios.delete("http://localhost:3000/api/Tarif", {
            data: {
                params
            }
        })
        SetCounter(0)
        SetSelectedList([])
        // const data = await fetch("http://localhost:3000/api/Tarif", {
        //     method: "DELETE",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(params)
        // })

    }
    function Calculer() {
        let result = 0
        var x = vd
        var y = va
        for (let i = 0; i < data.result.length; i++) {
            const element = data.result[i];
            const t = element.ville_troncon_ville_depToville.code
            const a = element.ville_troncon_ville_arrToville.code

            if (t == x && element.route.typer == R) {
                x = a
                result += element.prix
            }
            if (a == y && element.route.typer == R) break;
        }
        setResult(result);

    }
    if (error) {
        return <h1>Error</h1>
    }
    if (!data) return <div>loading...</div>;
    else {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Box m={'15px'}>
                        <Paper variant="outlined">
                            <TableContainer >
                                <Table stickyHeader >
                                    <StyledTableHead>
                                        <TableRow>
                                            <TableCell align="center">{Counter}</TableCell>
                                            <TableCell align="center">ID</TableCell>
                                            <TableCell align="center">Ville_départ</TableCell>
                                            <TableCell align="center">Ville_destinataire</TableCell>
                                            <TableCell align="center">Typer</TableCell>
                                            <TableCell align="center">Prix</TableCell>
                                        </TableRow>
                                    </StyledTableHead>
                                    <TableBody>
                                        {data.result.map((element) => <Row data={element} Counter={Counter} SetCounter={SetCounter} SetSelectedList={SetSelectedList} SelectedList={SelectedList} />)}
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <Accordion >
                                                    <StyledAccordionHead
                                                        expandIcon={<AddIcon />}
                                                    >
                                                        Ajouter
                                                </StyledAccordionHead>
                                                    <AccordionDetails>
                                                        <Table>
                                                            <TableRow>
                                                                <TableCell align='center' colSpan={2}>
                                                                    <Button color="primary"
                                                                        variant='outlined'
                                                                        disabled={Prix <= 0}
                                                                        onClick={() => {
                                                                            AddTarif()

                                                                        }} >Add</Button>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        value={Ville_dep}
                                                                        onChange={(e) => {
                                                                            setVille_dep(e.target.value)
                                                                        }}
                                                                        select
                                                                        label="Ville_départ"
                                                                        variant="outlined"
                                                                    >
                                                                        {
                                                                            data.villes.map((element) => {
                                                                                return <MenuItem
                                                                                    key={element.code}
                                                                                    value={element.code}
                                                                                    disabled={element.code == Ville_arr}
                                                                                >
                                                                                    {element.nom}
                                                                                </MenuItem>
                                                                            })
                                                                        }

                                                                    </TextField>

                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        select
                                                                        label="Ville_arrivée"
                                                                        variant="outlined"
                                                                        value={Ville_arr}
                                                                        onChange={(e) => setVille_arr(e.target.value)}
                                                                    >
                                                                        {
                                                                            data.villes.map((element) => {
                                                                                return <MenuItem
                                                                                    key={element.code}
                                                                                    value={element.code}
                                                                                    disabled={Ville_dep == element.code}
                                                                                >
                                                                                    {element.nom}
                                                                                </MenuItem>
                                                                            })
                                                                        }

                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField select
                                                                        label="Route"
                                                                        value={Route}
                                                                        variant="outlined"
                                                                        onChange={(e) => setRoute(Number.parseInt(e.target.value))}>
                                                                        <MenuItem value={1}>route nationale</MenuItem>
                                                                        <MenuItem value={2}>autoroute</MenuItem>
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        type="number"
                                                                        variant="outlined"
                                                                        label="Prix"
                                                                        value={Prix}
                                                                        error={Prix <= 0}
                                                                        helperText={Prix <= 0 ? "Prix > 0" : null}
                                                                        inputProps={{ min: 1 }}
                                                                        onChange={(e) => setPrix(Number.parseInt(e.target.value))}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        </Table>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                    </Box>
                    <Box m={'15px'}
                        display="flex"
                        flexDirection="row-reverse" >
                        <Tooltip title="Delete" arrow>
                            <span>
                                <IconButton
                                    disabled={Counter == 0}
                                    color={'secondary'}
                                    onClick={() => {
                                        DeleteElements(SelectedList)
                                    }
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Box>

                    <Box className={classes.root}
                        flexGrow={1}
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center">
                        <TextField
                            select
                            label="Ville_départ"
                            value={vd}
                            onChange={(e) => { setVd(e.target.value) }}

                            variant="outlined"
                        >
                            {
                                data.villes.map((element) => {
                                    return <MenuItem
                                        key={element.code}
                                        value={element.code}
                                        disabled={element.code == va}

                                    >
                                        {element.nom}
                                    </MenuItem>
                                })
                            }
                        </TextField>
                        <TextField
                            select
                            label="Ville_arrivée"
                            value={va}
                            onChange={(e) => { setVa(e.target.value) }}
                            variant="outlined"
                        >
                            {
                                data.villes.map((element) => {
                                    return <MenuItem
                                        key={element.code}
                                        value={element.code}
                                        disabled={element.code == vd}
                                    >
                                        {element.nom}
                                    </MenuItem>
                                })
                            }
                        </TextField>
                        <TextField select
                            label="Route"
                            variant="outlined"
                            value={R}
                            onChange={(e) => setR(e.target.value)}
                        >
                            <MenuItem
                                value={"route nationale"}
                            >route nationale</MenuItem>
                            <MenuItem
                                value={"autoroute"}
                            >autoroute</MenuItem>
                        </TextField>
                        <Button
                            startIcon={<AttachMoney />}
                            onClick={Calculer}
                            variant='outlined'
                            className={test.root}
                            disabled={(!va || !vd || !R)}
                        >Calculer
                            </Button>
                        <h2 style={{ color: "white" }}>{result + " DT"}</h2>
                    </Box>
                </ThemeProvider >
            </>
        )
    }

}



export default Home
