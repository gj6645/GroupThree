import React, { useState } from "react"
import "./Main.css"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import { Box } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";
import CategoryTables from '../components/tables/CategoryTables';
import Button from '@mui/material/Button';
import Axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel } from "@mui/material"
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Notification from "../components/Notification";



export default function Category() {
    const [open, setOpen] = React.useState(false);

    //Notifications
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    const handleNotify = () => {
        setNotify({ isOpen: true, message: "Form was Submitted Successfully", type: "success" });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const reload = () => {
        setTimeout(() => { window.location.reload(false); }, 1000);
    }

    const [tasks_categories, setTasks_categories] = React.useState('');

    // Create function to call API
    const createCategory = () => {
        Axios.post("https://csc4710dbs.herokuapp.com/api/createCategory", {

            tasks_categories: tasks_categories,

        }).then(() => {
            console.log("Added Category");
        })
    }

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
                        
                        <h3>Categories</h3>
                        <hr></hr>
                        <br></br>
                        {/* Button for add new task */}
                        <Button variant="contained" onClick={handleClickOpen} >
                            <span class="material-icons" style={{ padding: "1px" }} >add</span>
                            Add New Category
                        </Button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                        <CategoryTables />
                    </Box>
                </Box >

                {/* Pop up form*/}
                <div className="text-center">
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            <h3>
                                New Category
                            </h3>
                        </DialogTitle>
                        <DialogContent>
                            <div className="text-center">
                                <Box
                                    margin="auto"
                                    alignItems="center"
                                    justifyContent="center"
                                    className="text-center"
                                    component="form"
                                    sx={{
                                        width: 500,
                                        height: 200,
                                    }}
                                >

                                    <Stack spacing={3}>
                                        {/* task category */}
                                        <Stack>
                                            <FormGroup>
                                                <InputLabel required id="taskCategory"> Task Category</InputLabel><br></br>
                                                <FormControl>
                                                    <TextField
                                                        id="taskCategory"
                                                        required
                                                        type="text"
                                                        placeholder="Enter Task Category"
                                                        onChange={(e) => setTasks_categories(e.target.value)}
                                                    />
                                                </FormControl>
                                            </FormGroup>
                                        </Stack>

                                    </Stack>
                                </Box>
                            </div>
                        </DialogContent>

                        <DialogActions>
                            <Button
                                onClick={handleClose}
                                variant="contained">
                                <span class="material-icons">cancel</span>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    createCategory();
                                    handleClose();
                                    handleNotify();
                                    reload();
                                }}
                            >
                                <span class="material-icons">add</span>
                                Add Category
                            </Button>
                        </DialogActions>

                    </Dialog>
                </div>
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}