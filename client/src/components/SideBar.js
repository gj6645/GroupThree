import React from 'react'
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Link from '@material-ui/core/Link';
import { ListItemButton } from "@mui/material";
import Collapse from '@mui/material/Collapse';


const drawerWidth = 240;
export default function SideBar() {
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpenSideBar = () => {
        setOpen(!open);
    };


    return (
        <Drawer
            sx={{
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
            
            <List>

                <ListItemButton button component={Link} href="/">
                    {/* if we want to use home icon we put it here */}
                    <ListItemText primary="Home" />
                </ListItemButton>

            </List>
            <List>

                <ListItemButton button component={Link} href="/authors">
                    <ListItemText primary="All Tasks" />
                </ListItemButton>

                <ListItem button component={Link} href="/authors">
                    <ListItemText primary="Category" />
                </ListItem>

                {/* make a select */}
                {/* add real links */}
                <ListItemButton onClick={handleClickOpenSideBar}>
                    <ListItemText primary="Report List" />
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Link1" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Link2" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Link3" />
                        </ListItemButton>
                    </List>
                </Collapse>

            </List>
            <Toolbar />
            <Toolbar />
            <List>
                <ListItem button component={Link} href="/authors">
                    <ListItemText primary="About Us" />
                </ListItem>
            </List>
        </Drawer>

    )


}