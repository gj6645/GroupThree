import React from "react"
import "./Main.css"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Box } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";

export default function CategoryOptions() {

    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >

                <Toolbar />
                <h3>Category Options</h3>
                <hr></hr>

            </Box>
        </Box >
    )
}