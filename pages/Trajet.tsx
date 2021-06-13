import { useState, useEffect } from 'react';
import { Paper,Box, TableBody, Table, TableCell, TableContainer} from '@material-ui/core'
import {StyledTableHead,themeL,useStyles,StyledTableRow} from '../materialcustom/Fcs'

import { ThemeProvider } from '@material-ui/core/styles'
import useSWR from 'swr'

async function fetcher(API_URL) {
    const Data = await fetch(API_URL, { method: "GET" })
    const res = await Data.json()
    return res
}



function Trajet() {
    const [Name, setName] = useState("")
    const [Matricule, setMatricule] = useState("")
    const { data, error } = useSWR("http://localhost:3000/api/Trajet", fetcher, { revalidateOnFocus: false });


    if (error) {
        return <h1>Error</h1>
    }
    if (!data) return <div>loading...</div>;
    else {

        return (
            <ThemeProvider theme={themeL}>
                <Box m={'15px'}>
                <Paper variant="outlined">
                <TableContainer >
                    <Table stickyHeader>
                        <StyledTableHead>
                            <StyledTableRow>
                                <TableCell align="center" >ID</TableCell>
                                <TableCell align="center" >Bus_id</TableCell>
                                <TableCell align="center">ville_dep</TableCell>
                                <TableCell align="center">ville_des</TableCell>
                                <TableCell align="center">ha</TableCell>
                                <TableCell align="center">hd</TableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {data.map((element) => (
                                <StyledTableRow key={element.code}>
                                    <TableCell align="center" >{element.code}</TableCell>
                                    <TableCell align="center">{element.bus_id}</TableCell>
                                    <TableCell align="center">{element.ville_trajet_id_depToville.nom}</TableCell>
                                    <TableCell align="center">{element.ville_trajet_id_arrToville.nom}</TableCell>
                                    <TableCell align="center">{element.ha}</TableCell>
                                    <TableCell align="center">{element.hd}</TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
                </Box>
            </ThemeProvider >
        )
    }

}
export default Trajet