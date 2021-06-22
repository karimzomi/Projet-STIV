import Link from "next/link"
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import {
    Collapse, Checkbox, IconButton,
    Paper, Box, TableBody,
    Table, TableCell, TableContainer,
    ThemeProvider, Input,
    TableRow, Button
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { StyledTableHead, theme } from '../materialcustom/Fcs'
import axios from "axios"

async function fetcher(API_URL) {
    const Data = await fetch(API_URL, { method: "GET" })
    const res = await Data.json()
    return res
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
            <TableRow hover selected={select} key={data.id}>
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
                <TableCell align="center">{data.ville_troncon_ville_depToville.nom}</TableCell>
                <TableCell align="center">{data.ville_troncon_ville_arrToville.nom}</TableCell>
                <TableCell align="center">{data.route.typer}</TableCell>
                <TableCell align="center">{data.prix + " DT"}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <p>Sup</p>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

function Home() {
    const [Counter, SetCounter] = useState(0)
    const [SelectedList, SetSelectedList] = useState([])
    const [Villes, SetVilles] = useState([])
    const [EditRow, SetEditRow] = useState(false)
    //Add Tarif
    const [Prix, setPrix] = useState(0)
    const [Ville_arr, setVille_arr] = useState(1)
    const [Ville_dep, setVille_dep] = useState(1)
    const [Route, setRoute] = useState(1)

    const { data, error } = useSWR("http://localhost:3000/api/Tarif", fetcher, { refreshInterval: 2 });
    useEffect(() => {
        const fetchData = async () => {
            const Data = await fetch("http://localhost:3000/api/Villes", { method: "GET" })
            const res = await Data.json()
            SetVilles(res.villes)
        };
        fetchData()
    }, [])
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
            data:{
                params
            }
        })
    // const data = await fetch("http://localhost:3000/api/Tarif", {
    //     method: "DELETE",
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(params)
    // })

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
                            <Table stickyHeader>
                                <StyledTableHead>
                                    <TableRow>
                                        <TableCell align="center">{Counter}</TableCell>
                                        <TableCell align="center">Info</TableCell>
                                        <TableCell align="center">ville_dep</TableCell>
                                        <TableCell align="center">ville_des</TableCell>
                                        <TableCell align="center">typer</TableCell>
                                        <TableCell align="center">prix</TableCell>
                                    </TableRow>
                                </StyledTableHead>
                                <TableBody>
                                    {data.map((element) => <Row data={element} Counter={Counter} SetCounter={SetCounter} SetSelectedList={SetSelectedList} SelectedList={SelectedList} />)}
                                    <TableRow style={EditRow ? { display: 'table-row' } : { display: 'none' }} >
                                        <TableCell align='center' colSpan={2}>
                                            <Button variant='outlined' color={'secondary'} onClick={() => {
                                                AddTarif()
                                                SetEditRow(false)

                                            }} >Add</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <select onChange={(e) => setVille_dep(Number.parseInt(e.target.value))}>
                                                {Villes.map((item) => <option value={item.code}>{item.nom}</option>)}
                                            </select>
                                        </TableCell>
                                        <TableCell align="center">
                                            <select onChange={(e) => setVille_arr(Number.parseInt(e.target.value))}>
                                                {Villes.map((item) => <option value={item.code}>{item.nom}</option>)}
                                            </select>
                                        </TableCell>
                                        <TableCell align="center">
                                            <select value={Route} onChange={(e) => setRoute(Number.parseInt(e.target.value))}>
                                                <option value={1}>route nationale</option>
                                                <option value={2}>autoroute</option>
                                            </select>
                                        </TableCell>
                                        <TableCell align="center">
                                            <input type="number" value={Prix} onChange={(e) => setPrix(Number.parseInt(e.target.value))} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </Box>
                <Box m={'15px'} display="flex" justifyContent="center" alignItems="center" flexDirection="row-reverse" p={1} >
                    <IconButton
                        disabled={Counter == 0 }
                        color={'primary'}
                        onClick={() => {
                            DeleteElements(SelectedList)
                        }
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => {
                        SetEditRow(true)

                    }} color={'secondary'} >
                        <AddIcon />
                    </IconButton>
                    <Box flexGrow={1}>
                        <select name="Dep" id="Dep">
                            {Villes.map((item) => <option value={item.code}>{item.nom}</option>)}
                        </select>
                        <select name="Arr" id="Arr">
                            {Villes.map((item) => <option value={item.code}>{item.nom}</option>)}
                        </select>
                        <select>
                            <option value="rn">route nationale</option>
                            <option value="au">autoroute</option>
                        </select>
                    </Box>
                </Box>
            </ThemeProvider >
        </>
    )
}

}



export default Home
