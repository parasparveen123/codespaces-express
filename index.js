const express = require('express')
const app = express()
const port = 3000
const db = require('./db');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Serve the HTML report
app.get('/report', (req, res) => {
  res.sendFile(__dirname + '/report.html'); // assumes report.html is in same folder as server.js
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// 1. GET /departments
app.get('/departments', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM departments');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET /teachers
app.get('/teachers', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM teachers');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET /students
app.get('/students', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. GET /courses
app.get('/courses', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM courses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET /enrollments
app.get('/enrollments', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM enrollments');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. GET /grades
app.get('/grades', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM grades');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. GET /prerequisites
app.get('/prerequisites', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM course_prerequisites');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. GET /materials
app.get('/materials', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM course_materials');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. GET /exams
app.get('/exams', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM exams');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. GET /exam-results
app.get('/exam-results', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM exam_results');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. GET /timetables
app.get('/timetables', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM timetables');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 12. GET /feedback
app.get('/feedback', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM feedback');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 13. GET /staff
app.get('/staff', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM staff');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});