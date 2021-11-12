import React, { useState, useEffect } from "react"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Box } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";
import UseEffect from '../components/useEffect';
export default function AllTasks() {



    return(

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
                <h3>All Tasks</h3>
                <hr></hr>
                <UseEffect link={'https://csc4710dbs.herokuapp.com/api//api/getAllTasks'} />
            </Box>
        </Box >

    )
}