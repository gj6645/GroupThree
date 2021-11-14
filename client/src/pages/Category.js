import React from "react"
import "./Main.css"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Box } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";
import CategoryTables from '../components/tables/CategoryTables';
import Button from '@mui/material/Button';



export default function Category() {

    return (

        <>
        <div className="text-center">

        <Box sx={{ display: 'flex' }}>
            <Header />
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >

                <Toolbar />
                <br></br>
                                

                        {/* Button for add new task */}
                        <Button variant="contained" >
                            <span class="material-icons" style={{padding: "1px"}} >add</span>
                            Add New Category
                        </Button>
                        <br></br>
                        <br></br>
                        <br></br>
                
                <h3>Categories</h3>

                <br></br>

                <hr></hr>
                <CategoryTables />
            </Box>
        </Box >
        </div>

        </>
    )
}