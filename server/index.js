// Sample CRUD API for todo app
const express = require('express');
const app = express();
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TodoDB'
});

// POST API to insert todo values into database
app.post('/api/createTodos', (req, res) => {
    const task_name = req.body.task_name;

    // Query and insert values
    db.query('INSERT INTO task (name) VALUES (?)', 
    [task_name], 
    (err, result) => {

        if (err) {
            console.log(err);
            res.send(500, 'Error');
        } else {
            res.send(200, 'Success');
        }
    });
});

// GET API to get all todo values from database
app.get('/api/getTodos', (req, res) => {
    db.query('SELECT * FROM task', (err, result) => {
        if (err) {
            console.log(err);
            res.send(500, 'Error');
        } else {
            res.send(200, result);
        }
    });
});


// PUT API to update todo values in database
app.put('/api/updateTodos', (req, res) => {
    const task_id = req.body.task_id;
    const task_name = req.body.task_name;

    // Query and update values
    db.query('UPDATE task SET name = ? WHERE id = ?', 
    [task_name, task_id], 
    (err, result) => {

        if (err) {
            console.log(err);
            res.send(500, 'Error');
        } else {
            res.send(200, 'Success');
        }
    });
});


// DELETE API to delete todo values from database
app.delete('/api/deleteTodos', (req, res) => {
    const task_id = req.body.task_id;

    // Query and delete values
    db.query('DELETE FROM task WHERE id = ?', 
    [task_id], 
    (err, result) => {

        if (err) {
            console.log(err);
            res.send(500, 'Error');
        } else {
            res.send(200, 'Success');
        }
    });
});



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});