const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'S2019@abcd#',
    database: 'employee_management1'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to handle form submission
// Route to handle form submission
app.post('/addEmployeeAndInfo', (req, res) => {
    // Extract data from the request body
    const { name, employeeId, department, dob, gender, designation, salary, experience, age, degree } = req.body;

    // Check for null values
    // if (!name || !employeeId || !department || !dob || !gender || !designation || !salary || !experience || !age || !degree) {
    //     return res.status(400).json({ error: 'Missing required fields' });
    // }

    // Insert data into MySQL database
    const sql = 'INSERT INTO employ (name, employee_id, department, dob, gender, designation, salary, experience, age, degree) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, employeeId, department, dob, gender, designation, salary, experience, age, degree];
    
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding employee:', err);
            return res.status(500).json({ error: 'An error occurred while adding the employee' });
        }
        console.log('Employee added successfully');
        res.status(200).json({ message: 'Employee added successfully' });
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
