import React, { useState, useEffect } from "react"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import Axios from "axios";
import { MenuItem, Select, InputLabel } from "@mui/material";
import Box from '@mui/material/Box';
import "./PriorityTable.css";


// Create columns for id, description, due date, priority, category, status and actions
const columns = [
    //{ id: 'Tasks_id', label: 'ID', minWidth: 170 },
    { id: 'tasks_description', label: 'Description', minWidth: 170 },
    { id: 'tasks_due_date', label: 'Due Date', minWidth: 170 },
    { id: 'tasks_priority', label: 'Priority', minWidth: 170 },
    { id: 'tasks_categories', label: 'Category', minWidth: 170 },
    { id: 'tasks_status', label: 'Status', minWidth: 170 },

];

let categoryArray = [];

export default function StickyHeadTable() {

    const [rows, setRows] = useState([]);
    const [categories, setCategories] = useState([]);

    // Function to call https://csc4710dbs.herokuapp.com/api/getCategories and map through the tasks_categories and make a dropdown menu
    const getCategories = () => {
        Axios.get("https://csc4710dbs.herokuapp.com/api/getCategories").then(res => {
            setCategories(res.data);
            res.data.forEach((val) => {
                categoryArray.push(val.tasks_categories);
            })
        }).then(() => {
            console.log(categoryArray);
        }
        )
            .catch(err => {
                console.log(err);
            }
            )
    }

    // useEffect to display all tasks
    useEffect(() => {
        axios.get("https://csc4710dbs.herokuapp.com/api/getTasks")
            .then(res => {
                setRows(res.data);
                getCategories();
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Function to filter a task by category
    const categorySelection = (event) => {

        // Loop through the category array and if the category is equal to the event, call the API to display tasks for that category
        for (let i = 0; i < categoryArray.length; i++) {
            if (categoryArray[i] === event.target.value) {
                axios.get(`https://csc4710dbs.herokuapp.com/api/getTasks/${event.target.value}`)
                    .then(res => {
                        setRows(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            if (event.target.value === "None") {
                axios.get("https://csc4710dbs.herokuapp.com/api/getTasks")
                    .then(res => {
                        setRows(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }

    return (
        <>
            <div>
                <Box
                    margin="auto"
                    alignItems="center"
                    justifyContent="center"
                    className="text-center"
                    component="form"
                    sx={{
                        width: 500,
                        height: 150,
                    }}
                >

                    <InputLabel id="demo-simple-select-label">Filter Tasks by Category</InputLabel>
                    <br></br>
                    <Select
                        labelId="categories"
                        id="categories"
                        value={categorySelection}
                        onChange={categorySelection}
                    >
                        <MenuItem value="None">None</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.tasks_categories} value={category.tasks_categories}>{category.tasks_categories}</MenuItem>
                        ))}
                    </Select>

                </Box>
            </div>

            {/* // return setRows data to paper sx */}
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

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[15, 25, 100]}
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

        </>
    );
}

