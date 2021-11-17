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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Notification from "../Notification";



// Create columns for id, description, due date, priority, category, status and actions
const columns = [
    
    //{ id: 'Categories_id', label: 'ID', minWidth: 170 },
    { id: 'tasks_categories', label: 'Category Type', minWidth: 500 }
    
    
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

    // Mechanism  to update a task
    const [newCategory, setNewCategory] = useState('');

    

    const updateCategory = (id) => {
        // Using update api to update a task using /api/updateCategory/:Categories_id
        axios.put('https://csc4710dbs.herokuapp.com/api/updateCategory/' + id, {
            Categories_id: id,
            tasks_categories: newCategory
        }).then(res => {
            console.log(res);
            console.log(res.data);
            setNewCategory('');
            
        }
        ).catch(err => {
            console.log(err);
        }
        );

    }

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
               



// Mechanism to delete a task
  const [TasksList, setTasksList] = useState([]);
    const deleteCategory = (Categories_id) => {
        
        axios.delete(`https://csc4710dbs.herokuapp.com/api/deleteCategory/${Categories_id}`).then(res => {
            setTasksList(TasksList.filter((val) => {
                return val.Tasks_id === Categories_id;
            }));

            // refresh the page
            window.location.reload();
        });
    }


  
    return (
    
  <>
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
                                <Button onClick={handleClickOpen}> 
                                <EditIcon />
                                </Button>
                                </TableCell>


                                {/* Delete icon on each row*/}
                                <TableCell
                                style={{ minWidth: 17, align: 'right', color: '#1972d8', size: 'x-small', fontSize: 'small' }}
                                >{row.Tasks_actions}
                                <Button onClick={() => {
                                        deleteCategory(row.Categories_id);
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

    {/* Popup model to update a catefory*/}
    <Dialog open={open} onClose={handleClose}  >
    <DialogTitle>
                    <h3>
                        Update Category
                    </h3>
                </DialogTitle>
        <DialogContent
        sx={{
            width: 500,
            height: 200,
        }}>
            <TextField
            
                autoFocus
                margin="dense"
                id="name"
                label="Category"
                type="text"
                fullWidth
                value={newCategory}
                onChange={(e) => {
                    setNewCategory(e.target.value);
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={handleClose} color="primary">
            <span class="material-icons">cancel</span>
                Cancel
            </Button>

            <Button variant="contained" onClick={() => {
                updateCategory();
                handleClose();
                handleNotify();
                reload();
            }} color="primary">
                <span class="material-icons">add</span>
                Update
            </Button>
        </DialogActions>
    </Dialog>
    <Notification
                notify={notify}
                setNotify={setNotify}
            />


</>

    );
  }