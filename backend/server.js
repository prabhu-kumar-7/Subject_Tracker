// 1. Import packages
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// 2. Create Express app
const app = express();
const PORT = 3000;

// 3. Middleware
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // parse JSON body

// 4. Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // your MySQL username
    password: '7777', // your MySQL password
    database: 'placement_tracker'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// 5. Routes

// Test route
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Add progress
app.post('/add-progress', (req, res) => {
    const { topic, score } = req.body;
    if (!topic || !score) {
        return res.status(400).json({ message: 'Topic and score are required' });
    }

    const query = `INSERT INTO progress (topic, score) VALUES (?, ?)`;
    db.query(query, [topic, score], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({
            message: 'Progress added successfully',
            data: { id: result.insertId, topic, score }
        });
    });
});

// Get all progress
app.get('/progress', (req, res) => {
    const query = `SELECT * FROM progress`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });
});

// 6. Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
