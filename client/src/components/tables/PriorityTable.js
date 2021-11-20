import React, { useState, useEffect } from "react"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';
import axios, { Axios } from "axios";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";





// Create columns for id, description, due date, priority, category, status and actions
const columns = [
    //{ id: 'Tasks_id', label: 'ID', minWidth: 170 },
    { id: 'tasks_description', label: 'Description', minWidth: 170 },
    { id: 'tasks_due_date', label: 'Due Date', minWidth: 170 },
    { id: 'tasks_priority', label: 'Priority', minWidth: 170 },
    { id: 'tasks_categories', label: 'Category', minWidth: 170 },
    { id: 'tasks_status', label: 'Status', minWidth: 170 },
    //{ id: 'tasks_actions', label: 'Actions', minWidth: 17, align: 'right'},
];



export default function StickyHeadTable() {

    const [rows, setRows] = useState([]);

    // useEffect to display all tasks
    useEffect(() => {
        axios.get("https://csc4710dbs.herokuapp.com/api/getTasks")
            .then(res => {
                setRows(res.data);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // TODO: Function to update a task
    const [TasksList, setTasksList] = useState([]);


    // Function to delete a task
    const deleteTask = (Tasks_id) => {
        // Use api https://csc4710dbs.herokuapp.com/api/deleteTask/:Tasks_id to delete a task
        axios.delete(`https://csc4710dbs.herokuapp.com/api/deleteTask/${Tasks_id}`).then(res => {
            setTasksList(TasksList.filter((val) => {
                return val.Tasks_id === Tasks_id;
            }));

            // refresh the page
            window.location.reload();
        });
    }


    // If priority 1 is picked, call API https://csc4710dbs.herokuapp.com/api/getTasksByPriority/:tasks_priority and pass in priority 1 and display the tasks for that priority
    // If priority 2 is picked, call API https://csc4710dbs.herokuapp.com/api/getTasksByPriority/:tasks_priority and pass in priority 2 and display the tasks for that priority
    // If priority 3 is picked, call API https://csc4710dbs.herokuapp.com/api/getTasksByPriority/:tasks_priority and pass in priority 3 and display the tasks for that priority
    // If priority 4 is picked, call API https://csc4710dbs.herokuapp.com/api/getTasksByPriority/:tasks_priority and pass in priority 4 and display the tasks for that priority
    
    const prioritySelection = (event) => {
        if (event.target.value === "Priority 1") {
            axios.get("https://csc4710dbs.herokuapp.com/api/getTasksByPriority/Priority 1")
                .then(res => {
                    setRows(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else if (event.target.value === "Priority 2") {
            axios.get("https://csc4710dbs.herokuapp.com/api/getTasksByPriority/Priority 2")
                .then(res => {
                    setRows(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else if (event.target.value === "Priority 3") {
            axios.get("https://csc4710dbs.herokuapp.com/api/getTasksByPriority/Priority 3")

                .then(res => {
                    setRows(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else if (event.target.value === "Priority 4") {
            axios.get("https://csc4710dbs.herokuapp.com/api/getTasksByPriority/Priority 4")
                .then(res => {
                    setRows(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }




    return (

        // return setRows data to paper sx
        <>
        {/* Create a priority dropdown and get value for each value and display table based on what was picked */}
        <Paper>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.Tasks_id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary" onClick={() => deleteTask(row.Tasks_id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div>
            <FormControl
            sx={{
                width: "100"
            }}
            >
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={prioritySelection}
                    onChange={prioritySelection}
                    sx={{
                        width: "100"}}
                    
                >
                    <MenuItem value={"Priority 1"}>Priority 1</MenuItem>
                    <MenuItem value={"Priority 2"}>Priority 2</MenuItem>
                    <MenuItem value={"Priority 3"}>Priority 3</MenuItem>
                    <MenuItem value={"Priority 4"}>Priority 4</MenuItem>
                </Select>
            </FormControl>
        </div>
        </>
    );
}

