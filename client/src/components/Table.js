import React, { useState, useEffect } from "react"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];



// Create columns for id, description, due date, priority, category, and status
const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 170 },
    { id: 'dueDate', label: 'Due Date', minWidth: 170 },
    { id: 'priority', label: 'Priority', minWidth: 170 },
    { id: 'category', label: 'Category', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
];

    


function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

// Create data for table
// const rows = [
//     {
//         id: '1',
//         description: 'Task 1',
//         due_date: '2020-02-02',
//         priority: 'High',
//         category: 'Work',
//         status: 'In Progress',
//     },
//     {
//         id: '2',
//         description: 'Task 2',
//         due_date: '2020-02-02',
//         priority: 'High',
//         category: 'Work',
//         status: 'In Progress',
//     },
//     {
//         id: '3',
//         description: 'Task 3',
//         due_date: '2020-02-02',
//         priority: 'High',
//         category: 'Work',
//         status: 'In Progress',
//     },
//     {
//         id: '4',
//         description: 'Task 4',
//         due_date: '2020-02-02',
//         priority: 'High',
//         category: 'Work',
//         status: 'In Progress',
//     },

//     ];

export default function StickyHeadTable() {
    
    // get rows from https://csc4710dbs.herokuapp.com/api/getTasks api
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('https://csc4710dbs.herokuapp.com/api/getTasks')
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
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}  >
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