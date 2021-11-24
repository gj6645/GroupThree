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
import { InputLabel } from "@mui/material";

//datepicker
//required for date picker
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import DateMomentUtils from '@date-io/moment';
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
// Create columns for id, description, due date, priority, category, status and actions
const columns = [
    //{ id: 'Tasks_id', label: 'ID', minWidth: 170 },
    { id: 'tasks_description', label: 'Description', minWidth: 170 },
    { id: 'tasks_due_date', label: 'Due Date', minWidth: 170 },
    { id: 'tasks_priority', label: 'Priority', minWidth: 170 },
    { id: 'tasks_categories', label: 'Category', minWidth: 170 },
    { id: 'tasks_status', label: 'Status', minWidth: 170 },
    //{ id: 'tasks_actions', label: 'Actions', minWidth: 170 },
];


export default function StickyHeadTable() {
    
    // get rows from https://csc4710dbs.herokuapp.com/api/getTasks api
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('https://csc4710dbs.herokuapp.com/api/getCompletedTasks')
        .then((response) => response.json())
        .then((json) => setRows(json)).catch(error => console.log(error));

          
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

    //used for setting date
    const [value, setValue] = React.useState(new Date());


    const handleChange = (newValue) => {
     console.log(newValue);
     setValue(newValue);
     dueDateSelection(newValue);
   };

   // Mechanism to filter a task by due date
   const dueDateSelection = (event) => {
    // Create an array to store mapped rows of due date in the database
        let dueDateArray = [];
        var index=-10;
        // Call Completed tasks api
        axios.get("https://csc4710dbs.herokuapp.com/api/getCompletedTasks")
            .then(res => {
                // Map the completed tasks
                res.data.map((val) => {
                    // If the due date is equal to the selected due date, push the task to the dueDateArray
                        dueDateArray.push(val.tasks_due_date);

                });
                
                
                //loop to filter through dueDateArray and see at what index 'event' occurs
                for ( let i= 0; i<dueDateArray.length; i++) {
                    if (event === dueDateArray[i])
                    {
                        index=i;
                    }
                };
                // If the selected due date is equal to the due date in the database, display the task
                if (event === dueDateArray[index]) {
                    axios.get("https://csc4710dbs.herokuapp.com/api/getTasksByDueDate/" + event)
                        .then(res => {
                            setRows(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                //if no date was selected (user picks clear or default view)
                else if (event === null && index===-10) {
                    // If the selected due date is not equal to the due date in the database, display all tasks
                    axios.get("https://csc4710dbs.herokuapp.com/api/getCompletedTasks")
                        .then(res => {
                            setRows(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                //if date was selected but that date doesn't exist in completed api
                else if (event !== null && index===-10){
                    // If the selected due date is not equal to the due date in the database, display all tasks
                    axios.get("https://csc4710dbs.herokuapp.com/api/getTasksByPriority/:tasks_due_date")
                        .then(res => {
                            setRows(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
        })
        
        .catch(err => {
            console.log(err);
        console.log(dueDateArray);
        });
        index=-10;
    }


  
    return (
    
        <>
    {/* // return setRows data to paper sx */}
       
    
        <Box
                    sx={{
                        height: 70,
                    }}
                />
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
                    <InputLabel id="demo-simple-select-label">Filter Tasks by Completion Date</InputLabel>
                    <br></br>
        <MuiPickersUtilsProvider utils={DateMomentUtils}>
            <DatePicker
                clearable
                id="date-picker"
                format="YYYY-MM-DD"
                //label="Choose date"
                value={value}
                onChange={(newValue) => (newValue ? handleChange(newValue.format("YYYY-MM-DD")) : handleChange(null))}
                renderInput={(params) => (
                    <TextField {...params} helperText="Select Due Date" />
                )}
            />
        </MuiPickersUtilsProvider>
        </Box>
        
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 660 }}>
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
                    {/* 
                        Rows: {
                            Tasks_id,
                            Tasks_description,
                            Tasks_due_date,
                            Tasks_priority,
                            Tasks_category,
                            Tasks_status

                        }
                    */}
                    {/* For each row, add a edit and delete material ui button */}
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
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}

        />
    </Paper>


    </>
    
    );
  }