import React from "react"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Box } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";
import CompletedTasksTable from "../components/tables/CompletedTasksTable";


export default function CompletedTasks() {

    return (

        <Box sx={{ display: 'flex' }}>

            <Header />
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <h3>Completed Tasks</h3>
                <hr></hr>
                
                <CompletedTasksTable />
            </Box>
        </Box >

    )
}