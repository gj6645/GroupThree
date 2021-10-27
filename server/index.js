

const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors');


const PORT = 3001;

app.use(cors());

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

// middleware for post requests
app.use(express.json());

// middleware for post requests form-data
app.use(express.urlencoded({ extended: false }));

// middleware for post requests form-data, raw
app.use(express.raw({ type: '*/*' }));


// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error Occured!');
});


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    
});


// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

// setInterval(function () {
//     db.query('SELECT 1');
// }, 5000);

// set interval to never expire
setInterval(function () {
    db.query('SELECT 1');
}, 30000);


// create database
app.get('/api/createDB', (req, res) => {
    // check if database exists
    let sql = 'CREATE DATABASE heroku_abb1c8b0518b179';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
        connection.release();
    });
});


// create table in database
app.get('/api/createTaskTable', (req, res) => {
    let sql = 'CREATE TABLE task(id int AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});


// POST API to insert tasks into database
// TODO: We need to add more attributes to the task table
app.post('/api/createTask', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    db.query('INSERT INTO task (title, description) VALUES (?, ?)', 
    [title, description], 
    (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Task inserted...');
    });
});




// GET API to get all tasks from database
app.get('/api/getTasks', (req, res) => {
    db.query('SELECT * FROM task', 
    (err, rows, fields) => {
        if (!err) {
            //res.send(rows);
            res.header("Content-Type",'application/json');
            //res.send(JSON.stringify(rows));
            res.type('json').send(JSON.stringify(rows, null, 2) + '\n');

        } else {
            console.log(err);
        }
    });
});



// GET API to get a task from database
app.get('/api/getTask/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM task WHERE id = ?', 
    [id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});


// PUT API to update a task in database
// TODO: We need to add more attributes to the task table
app.put('/api/updateTask/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    db.query('UPDATE task SET title = ?, description = ? WHERE id = ?',
    [title, description, id], 
    (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});



// DELETE API to delete a task from database
app.delete('/api/deleteTask/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM task WHERE id = ?', 
    [id], 
    (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });

    
});



app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running on port 3001');
});



/*
    TODO: Create a new endpoint to handle the following:
    - Display Task bases on day (e.g. Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
    - Display Task that have been marked as completed
    - Display Task that are overdue
    - Display Tasked based on Priority (e.g. Priority1, Priority2, Priority3)
    - Create more tables in database
*/

// Needs to be developed
// http://localhost:3001/api/getTasksByDay/:day
// http://localhost:3001/api/getTasksByPriority/:priority
// http://localhost:3001/api/getTasksByCompleted/:completed
// http://localhost:3001/api/getTasksByOverdue/:overdue
// http://localhost:3001/api/getTasksByDayAndPriority/:day/:priority



// Working api
// http://localhost:3001/api/createDB
// http://localhost:3001/api/createTaskTable
// http://localhost:3001/api/createTask
// http://localhost:3001/api/getTasks
// http://localhost:3001/api/getTask/:id
// http://localhost:3001/api/updateTask/:id
// http://localhost:3001/api/deleteTask/:id

