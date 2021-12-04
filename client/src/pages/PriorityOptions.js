import React from "react"
import "./Main.css"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Box } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";
import PriorityTable from '../components/tables/PriorityTable';

export default function PriorityOptions() {

    return (
        <Box sx={{ display: 'flex' }}>
            {/* header */}
            <Header />
            {/* side bar */}
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >

                <Toolbar />
                <h3>Priority Options</h3>
                <hr></hr>
                <br></br>
                <PriorityTable />
            </Box>
        </Box >
    )
}