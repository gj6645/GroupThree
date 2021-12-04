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
import axios from "axios";


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

    // get rows from https://csc4710dbs.herokuapp.com/api/getTasks api
    const [rows, setRows] = useState([]);

    useEffect(() => {
        // Once GET Today's Tasks api is working, swap below with GET Today's Tasks api
        fetch('https://csc4710dbs.herokuapp.com/api/getTasksToday')
            .then((response) => response.json())
            .then((json) => setRows(json)).catch(error => console.log(error));
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

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}

                                        actionsColumnIndex={-1}
                                    >
                                        {column.label}

                                    </TableCell>

                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}

                                        {/* Edit icon on each row*/}
                                        <TableCell
                                            style={{ minWidth: 17, align: 'right', color: '#1972d8', size: 'x-small' }}
                                        >{row.Tasks_actions}
                                            <EditIcon />
                                        </TableCell>

                                        {/* Delete icon on each row*/}
                                        <TableCell
                                            style={{ minWidth: 17, align: 'right', color: '#1972d8', size: 'x-small' }}
                                        >{row.Tasks_actions}
                                            <Button onClick={() => {
                                                deleteTask(row.Tasks_id);
                                            }}>
                                                <DeleteIcon
                                                />
                                            </Button>
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
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}

                />
            </Paper>
        </>

    );
}