import React, { useState, useEffect } from "react"
import "./Main.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";
import "./Main.css"
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import 'date-fns'
import DateMomentUtils from '@date-io/moment';
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// Notifications
import Notification from "../components/Notification";
// side bar 
import SideBar from "../components/SideBar";
//header
import Header from "../components/Header";
import Toolbar from "@mui/material/Toolbar";
import SideBarMain from "../components/SideBarMain";

//tables
import UseEffect from '../components/useEffect';


export default function Main() {
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

    
    const [tasks_description, setTasks_description] = React.useState("");
    const [tasks_due_date, setTasks_due_date] = React.useState(null);
    const [tasks_priority, setTasks_priority] = React.useState('');
    const [tasks_categories, setTasks_categories] = React.useState('');
    const [tasks_status, setTasks_status] = React.useState('');

    // Create function to call API
    const createTask = () => {
        Axios.post("https://csc4710dbs.herokuapp.com/api/createTask", {
            tasks_description: tasks_description,
            tasks_due_date: tasks_due_date,
            tasks_priority: tasks_priority,
            tasks_categories: tasks_categories,
            tasks_status: tasks_status
        }).then(() => {
            console.log("Added Task");
        })
    }

    return (

        <>
            <div className="text-center">
                <head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                </head>
                <Box sx={{ display: 'flex' }}>
                    {/* header */}
                    <Header />
                    {/* side bar */}
                    <SideBarMain />

                    <Box

                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                    >
                        <Toolbar />
                        <br></br>

                        {/* Button for add new task */}
                        <Button variant="contained" onClick={handleClickOpen}>
                            <span class="material-icons">add</span>
                            Add New Task
                        </Button>

                        <Toolbar />

                        {/* First Data Table  */}
                        <h3>Today's Tasks:</h3>
                        <hr></hr>
                        <Toolbar />
                        <UseEffect link={'https://csc4710dbs.herokuapp.com/api/getTasksToday'}/>

                        {/* Second Data Table */}
                        <h3> Overdue Tasks:</h3>
                        <hr></hr>
                         <Toolbar />
                        <UseEffect link={'https://csc4710dbs.herokuapp.com/api/getOverdueTasks'}/>

                    </Box>
                </Box>

                {/* <div className="text-center">
                <a href="/sample">Click here to see sample on how api is working with UI</a>
                </div> */}

                {/* pop up form */}
                <div className="text-center">
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>New Task</DialogTitle>
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
                                        height: 500,
                                    }}
                                >
                                    <Stack spacing={3}>
                                        {/* top of Form */}
                                        <h2> Task Information </h2>


                                        {/* task description */}
                                        <Stack>
                                            <InputLabel id="taskDescription"> Task Description</InputLabel>
                                            <TextField
                                                id="taskDescription"
                                                // label="taskDescription"
                                                type="text"
                                                multiline
                                                rows={3}
                                                placeholder="Task Description"
                                                onChange={(event) => {
                                                    setTasks_description(event.target.value);
                                                }}
                                            />
                                        </Stack>


                                        {/* date and time  */}
                                        <Stack>
                                            <InputLabel required id="date">
                                                Due Date
                                            </InputLabel>
                                            <MuiPickersUtilsProvider utils={DateMomentUtils}>
                                                <DatePicker
                                                    clearable
                                                    id="date-picker"
                                                    format="YYYY-MM-DD"
                                                    label="Choose date"
                                                    value={tasks_due_date}
                                                    onChange={(newValue) => setTasks_due_date(newValue.format("YYYY-MM-DD"))}
                                                    renderInput={(params) => (
                                                        <TextField {...params} helperText="Select Due Date" />
                                                    )}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Stack>

                                        {/* Categories*/}
                                        <Stack>
                                            <InputLabel id="categoryName">
                                                Category
                                            </InputLabel>
                                            <TextField
                                                id="categoryName"
                                                type="text"
                                                placeholder="Category Name"
                                                onChange={(event) => {
                                                    setTasks_categories(event.target.value);
                                                }}
                                            />
                                        </Stack>



                                        {/* priority */}
                                        <Stack>
                                            <InputLabel id="priority">Priority Level</InputLabel>
                                            <Select

                                                id="priority_select"
                                                value={tasks_priority}
                                                label="Priority"
                                                onChange={(event) => {
                                                    setTasks_priority(event.target.value);
                                                }}
                                                placeholder="priority"
                                                display="block"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={"Priority 1"}>1</MenuItem>
                                                <MenuItem value={"Priority 2"}>2</MenuItem>
                                                <MenuItem value={"Priority 3"}>3</MenuItem>
                                                <MenuItem value={"Priority 4"}>4</MenuItem>
                                            </Select>

                                        </Stack>

                                        {/* status */}
                                        <Stack>
                                            <InputLabel id="status">Status</InputLabel>
                                            <Select
                                                id="status_select"
                                                value={tasks_status}
                                                label="status"
                                                onChange={(event) => {
                                                    setTasks_status(event.target.value);
                                                }}
                                                placeholder="status"
                                                display="block"
                                            >
                                                <MenuItem value={"Completed"}>Completed</MenuItem>
                                                <MenuItem value={"Active"}>Active</MenuItem>
                                            </Select>

                                            <br></br>
                                        </Stack>
                                    </Stack>
                                </Box >
                            </div >
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
                                    createTask();
                                    handleClose();
                                    handleNotify();
                                }}
                            >
                                <span class="material-icons">add</span>
                                Add Task</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />


        </>

    );

}