const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1122',
    database: 'flashcards_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Routes will be added here...

app.listen(5000, () => {
    console.log('Server started on port 5000');
});


// Fetch all flashcards
app.get('/api/flashcards', (req, res) => {
    const sql = "SELECT * FROM flashcards";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Add a new flashcard
app.post('/api/flashcards', (req, res) => {
    const { question, answer } = req.body;
    const sql = "INSERT INTO flashcards (question, answer) VALUES (?, ?)";
    db.query(sql, [question, answer], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

// Edit a flashcard
app.put('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const sql = "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?";
    db.query(sql, [question, answer, id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Delete a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM flashcards WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
