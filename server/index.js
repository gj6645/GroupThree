const express = require('express');
const app = express();
const mysql = require('mysql2')
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
app.use(express.raw({ type: '/' }));
// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error Occured!');
});




const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// set interval to never expire
setInterval(function () {
    db.query('SELECT * FROM tasks');
}, 30000);

// Using set interval to check if the connection is still alive and if not, it will reconnect
setInterval(function () {
    db.query('SELECT * FROM tasks');
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
    let sql = "CREATE TABLE tasks(Tasks_id int AUTO_INCREMENT, tasks_name VARCHAR(255), tasks_description VARCHAR(255), tasks_priority VARCHAR(255), Categories_id int, tasks_categories VARCHAR(10), tasks_status VARCHAR(255), tasks_due_date datetime, PRIMARY KEY(Tasks_id), FOREIGN KEY(Categories_id) REFERENCES categories(Categories_id))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});


// create categories table in database
app.get('/api/createCategoriesTable', (req, res) => {
    let sql = 'CREATE TABLE categories(Categories_id int AUTO_INCREMENT, tasks_categories VARCHAR(255), PRIMARY KEY(Categories_id))';
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
    
    const tasks_description = req.body.tasks_description;
    const tasks_categories = req.body.tasks_categories;
    const Categories_id = req.body.Categories_id;
    const tasks_priority = req.body.tasks_priority;
    const tasks_due_date = req.body.tasks_due_date;
    const tasks_status = req.body.tasks_status;
    db.query('INSERT INTO tasks (tasks_description, tasks_categories, Categories_id, tasks_priority, tasks_status, tasks_due_date) VALUES (?, ?, ?, ?, ?, ?)',
    [tasks_description, tasks_categories, Categories_id, tasks_priority, tasks_status, tasks_due_date], (err, result) => {
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
            //res.send(rows);
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


// GET API to get tasks due today
app.get('/api/getTasksToday', (req, res) => {
    
    db.query('SELECT * FROM tasks WHERE tasks_due_date = curdate()',
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

// GET API to get overdue tasks
app.get('/api/getOverdueTasks', (req, res) => {
    db.query('SELECT * FROM tasks WHERE tasks_due_date < curdate()',
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


// GET API to get tasks based on dropdown category selection
app.get('/api/getTasks/:category', (req, res) => {
    const category = req.params.category;
    db.query('SELECT * FROM tasks WHERE tasks_categories = ?', [category], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
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
    const tasks_description = req.body.tasks_description;
    const Categories_id = req.body.Categories_id;
    const tasks_priority = req.body.tasks_priority;
    const tasks_status = req.body.tasks_status;
    const tasks_due_date = req.body.tasks_due_date;
    db.query('UPDATE tasks SET tasks_description = ?, Categories_id = ?, tasks_priority = ?, tasks_status = ?, tasks_due_date = ? WHERE Tasks_id = ?',
    [tasks_description, Categories_id, tasks_priority, tasks_status, tasks_due_date, Tasks_id],
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



module.exports = db.promise();




/*
    TODO: Create a new endpoint to handle the following:
    - Display Task that have based on date selected by the user
    - Display Task based on Priority (e.g. Priority 1, Priority 2, Priority 3, Priority 4)
    - Display Task based on Status (e.g. Completed, Active)
*/

// Auto reset auto increment value to 1
// ALTER TABLE tasks AUTO_INCREMENT = 1;


// API ENDPOINT that Needs to be developed
// http://localhost:3001/api/getTasksByDay/:day
// http://localhost:3001/api/getTasksByPriority/:priority
// http://localhost:3001/api/getTasksByCompleted/:completed
// http://localhost:3001/api/getTasksByActive/:active



// Working api
// http://localhost:3001/api/createDB
// http://localhost:3001/api/createTaskTable
// http://localhost:3001/api/createTask
// http://localhost:3001/api/getTasks
// http://localhost:3001/api/getTask/:id
// http://localhost:3001/api/getTasksToday
// http://localhost:3001/api/getOverdueTasks
// http://localhost:3001/api/getTasks/:category
// http://localhost:3001/api/updateTask/:id
// http://localhost:3001/api/deleteTask/:id