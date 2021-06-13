import Link from "next/link"
import { useState } from 'react'
import useSWR from 'swr'
import {
    Collapse, Checkbox, IconButton,
    Paper, Box, TableBody,
    Table, TableCell, TableContainer,
    ThemeProvider,
    TableRow
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { StyledTableHead, theme } from '../materialcustom/Fcs'

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
    const SelectedList:Array<any> = props.SelectedList
    const SetSelectedList = props.SetSelectedList
    
    const test = ()=>{
        var List = SelectedList
        if (select) {
            setselect(false)
            SetCounter(Counter-1)
            SetSelectedList(List.filter((item) => item !== data.id ))
        }
        else {
            setselect(true)
            SetCounter(Counter+1)
            SetSelectedList(List.concat([data.id]))
        }

    }
    return (
        <>
            <TableRow  hover selected={select} key={data.id}>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={select}
                        onClick={test}
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
    const { data, error } = useSWR("http://localhost:3000/api/Tarif", fetcher, { revalidateOnFocus: false });
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
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                    </Box>
                    <IconButton color={'primary'} onClick={()=> console.log(SelectedList)} >
                        <DeleteIcon />
                    </IconButton>
                </ThemeProvider >
                {/* <select name="" id="">
                    {data.villes.map((item)=> {

                        return <option>{item.ville_trajet_id_depToville.nom}</option>
                    })}
                </select>
                <select name="" id="">
                    {data.villes.map((item)=> <option>{item.ville_trajet_id_arrToville.nom}</option>)}
                </select> */}
            </>
        )
    }

}



export default Home
