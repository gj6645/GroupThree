import React from "react"
import Cards from "../components/Cards"
import "./Authors.css"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Box } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";


export default function Authors() {
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
                    <h3>Authors</h3>
                    <hr></hr>
                    {/* Paragraph */}

                    <p className="text-center">
                        Here are all the contributors to the development of CSC 4710 Todo Application.
                    </p>
                    <div id="cards">
                        <Cards />
                    </div>
                </Box>
            </Box >

        </>

    )
}