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



// Create columns for id, description, due date, priority, category, status and actions
const columns = [
    { id: 'Tasks_id', label: 'ID', minWidth: 170 },
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
        fetch('https://csc4710dbs.herokuapp.com/api/getOverdueTasks')
        .then((response) => response.json())
          .then((json) => setRows(json));

          
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
  
    return (
    
        
    // return setRows data to paper sx
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
                                <DeleteIcon />
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



    
    );
  }