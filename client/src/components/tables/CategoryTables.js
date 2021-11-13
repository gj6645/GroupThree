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
    
    { id: 'Categories_id', label: 'ID', minWidth: 20 },
    { id: 'tasks_categories', label: 'Category Type', minWidth: 20 }
    
    
];

export default function StickyHeadTable() {
    
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('https://csc4710dbs.herokuapp.com/api/getCategories')
        .then((response) => response.json())
          .then((json) => setRows(json));
    }, []);

    //changing table view
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
  
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
    const deleteTask = (Categories_id) => {
        
        axios.delete(`https://csc4710dbs.herokuapp.com/api/deleteCategory/${Categories_id}`).then(res => {
            setTasksList(TasksList.filter((val) => {
                return val.Tasks_id === Categories_id;
            }));

            // refresh the page
            window.location.reload();
        });
    }


  
    return (
    
        
    // return setRows data to paper sx
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
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
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
                                    style={{ minWidth: 17, align: 'right', color: '#1972d8', size: 'x-small', fontSize: 'small' }}
                                >{row.Tasks_actions}
                                <EditIcon />
                                </TableCell>


                                {/* Delete icon on each row*/}
                                <TableCell
                                style={{ minWidth: 17, align: 'right', color: '#1972d8', size: 'x-small', fontSize: 'small' }}
                                >{row.Tasks_actions}
                                <Button onClick={() => {
                                        deleteTask(row.Categories_id);
                                    }}> 
                                <DeleteIcon/>
                                </Button>
                                </TableCell>
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


    );
  }