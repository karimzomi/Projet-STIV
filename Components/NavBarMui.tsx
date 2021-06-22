import { useState } from 'react'
import { AppBar, Tab, Tabs,Box ,Typography } from '@material-ui/core'
import Link from "next/link"
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
function NavBar() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (

        <>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <Tab
                        component="a"
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                        href="/Trajet"
                        label="Trajet"
                    />
                    <Tab
                        component="a"
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                        href="/Tarifs"
                        label="Tarifs"
                    /></Tabs>

                {/* <Link href="/Trajet">
                <a id="TrajetLink" >Trajet</a>
            </Link>
            <Link href="/Tarifs">
                <a id="TarifsLink">Tarifs</a>
            </Link> */}
            </AppBar>
            <TabPanel value={value} index={0}>
                Page One
    </TabPanel>
            <TabPanel value={value} index={1}>
                Page Two
    </TabPanel>
        </>
    )
}
export default NavBar