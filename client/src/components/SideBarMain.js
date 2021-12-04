import React from 'react'
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Link from '@material-ui/core/Link';
import { ListItemButton } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import "./SideBar.css"

const drawerWidth = 200;


export default function SideBar() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpenSideBar = () => {
        setOpen(!open);
    };

    return (
        <>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            </head>
            <Drawer
                sx={{
                    backgroundcolor: "black",
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
                   
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <List>

                    <ListItemButton button component={Link} href="/">
                        <span class="material-icons">home</span>
                        {/* if we want to use home icon we put it here */}
                        <ListItemText primary="Home" />
                    </ListItemButton>

                    <ListItemButton button component={Link} href="/alltasks">
                        <ListItemText primary="All Tasks" />
                    </ListItemButton>

                    <ListItem button component={Link} href="/category">
                        <ListItemText primary="Category" />
                    </ListItem>

                    {/* make a select */}
                    {/* add real links */}
                    <ListItemButton onClick={handleClickOpenSideBar}>
                        <ListItemText primary="Report List" />
                        {open ? <span class="material-icons">expand_less</span> : <span class="material-icons">expand_more</span>}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton button component={Link} href="/categoryoptions" sx={{ pl: 4 }}>
                                <ListItemText primary="Category Options" />
                            </ListItemButton>
                            <ListItemButton button component={Link} href="/completedtasks" sx={{ pl: 4 }}>
                                <ListItemText primary="Completed Tasks" />
                            </ListItemButton>
                            <ListItemButton button component={Link} href="/priorityoptions" sx={{ pl: 4 }}>
                                <ListItemText primary="Priority Options" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                <Toolbar />
                <Toolbar />
                <List>
                    <ListItem button component={Link} href="/usermanual">
                        <ListItemText primary="User Manual" />
                    </ListItem>
                </List>
                <List>
                    <ListItem button component={Link} href="/authors">
                        <ListItemText primary="About Us" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    )


}