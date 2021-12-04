import React from 'react'
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Box } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";



export default function UserManual() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                {/* header */}
                <Header />
                {/* side bar */}
                <SideBar />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3 }}
                >

                    <Toolbar />
                    <h3>User Manual</h3>
                    <hr></hr>
                    {/* Paragraph */}

                    <p className="text-center">
                        Eisha Akbar Honors Project.
                    </p>
                </Box>
            </Box >



        </>

    )
}
