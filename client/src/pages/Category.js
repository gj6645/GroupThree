import React from "react"
import "./Main.css"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Box } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";
import CategoryTables from '../components/tables/CategoryTables';
export default function Category() {

    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >

                <Toolbar />
                <h3>Categories</h3>
                <hr></hr>
                <CategoryTables />
            </Box>
        </Box >
    )
}