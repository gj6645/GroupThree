import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from "@mui/material/Toolbar";
import "./Header.css"


const drawerWidth = 200;

export default function Header() {

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, 
                        height:'75px' }}
            >
                <Toolbar alignContent="center">
                    <Typography variant="h5" noWrap component="div" align="center">
                        To Do
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}