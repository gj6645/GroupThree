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


/*
 *******************************************
 ********* DATABASE AND TABLES API's **************
 *******************************************
*/

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


// create task table in database
app.get('/api/createTasksTable', (req, res) => {
    let sql = "CREATE TABLE tasks(Tasks_id int AUTO_INCREMENT, tasks_name VARCHAR(255), tasks_description VARCHAR(255), tasks_priority VARCHAR(255), Categories_id int, tasks_categories VARCHAR(10), tasks_due_date datetime, PRIMARY KEY(Tasks_id), FOREIGN KEY(Categories_id) REFERENCES categories(Categories_id))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});


// create categories table in database
app.get('/api/createCategoriesTable', (req, res) => {
    let sql = 'CREATE TABLE `categories`(Categories_id int AUTO_INCREMENT, `tasks_categories` VARCHAR(255), PRIMARY KEY(Categories_id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});


/*
 *******************************************
 ********* POST CRUD API HERE **************
 *******************************************
*/

// POST API to insert tasks into database
app.post('/api/createTask', (req, res) => {
    const tasks_name = req.body.tasks_name;
    const tasks_description = req.body.tasks_description;
    // using catergorie_id from categories table to insert into tasks table
    const tasks_categories = req.body.tasks_categories;
    const Categories_id = req.body.Categories_id;
    const tasks_priority = req.body.tasks_priority;
    const tasks_due_date = req.body.tasks_due_date;


    db.query('INSERT INTO tasks (tasks_name, tasks_description, tasks_categories, Categories_id, tasks_priority, tasks_due_date) VALUES (?, ?, ?, ?, ?, ?)', 
    [tasks_name, tasks_description, tasks_categories, Categories_id, tasks_priority, tasks_due_date], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Task inserted...');
    });

});




/*
 *******************************************
 ********* GET CRUD API HERE **************
 *******************************************
*/
// GET API to get all tasks from database
app.get('/api/getTasks', (req, res) => {
    db.query('SELECT * FROM tasks', 
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
app.get('/api/getTask/:Tasks_id', (req, res) => {
    const Tasks_id = req.params.Tasks_id;
    db.query('SELECT * FROM tasks WHERE Tasks_id = ?', 
    [Tasks_id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});



/*
 *******************************************
 ********* UPDATE CRUD API HERE **************
 *******************************************
*/
// PUT API to update a task in database
// TODO: We need to add more attributes to the task table
app.put('/api/updateTask/:Tasks_id', (req, res) => {
    const Tasks_id = req.params.Tasks_id;
    const tasks_name = req.body.tasks_name;
    const tasks_description = req.body.tasks_description;
    // using catergorie_id from categories table to insert into tasks table
    const Categories_id = req.body.Categories_id;
    const tasks_priority = req.body.tasks_priority;
    const tasks_due_date = req.body.tasks_due_date;
    


    db.query('UPDATE tasks SET tasks_name = ?, tasks_description = ?, Categories_id = ?, tasks_priority = ?, tasks_due_date = ? WHERE Tasks_id = ?',
    [tasks_name, tasks_description, Categories_id, tasks_priority, tasks_due_date, Tasks_id],

    (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Task updated...');
    }
    );
});


/*
 *******************************************
 ********* DELETE CRUD API HERE **************
 *******************************************
*/
// DELETE API to delete a task from database
app.delete('/api/deleteTask/:Tasks_id', (req, res) => {
    const Tasks_id = req.params.Tasks_id;
    db.query('DELETE FROM tasks WHERE Tasks_id = ?', 
    [Tasks_id], 
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

