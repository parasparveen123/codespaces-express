const express = require('express')
const app = express()
const port = 3000
const db = require('./db');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/report', (req, res) => {
  res.sendFile(__dirname + '/report.html'); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.get('/departments', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM departments');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get('/teachers', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM teachers');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/students', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/courses', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM courses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/enrollments', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM enrollments');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/grades', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM grades');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/prerequisites', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM course_prerequisites');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/materials', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM course_materials');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/exams', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM exams');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/exam-results', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM exam_results');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/timetables', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM timetables');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/feedback', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM feedback');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/staff', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM staff');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});