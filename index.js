const express = require('express')
const app = express()
const port = 3000
const db = require('./db');



//app.use(cors()); 
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/report', (req, res) => {
  res.sendFile(__dirname + '/report.html'); 
});

app.get('/chart', (req, res) => {
  res.sendFile(__dirname + '/chart.html'); 
});

app.get('/add-student', (req, res) => {
  res.sendFile(__dirname + '/add-student.html'); 
});

app.get('/add-teacher', (req, res) => {
  res.sendFile(__dirname + '/add-teacher.html'); 
});
app.get('/add-staff', (req, res) => {
  res.sendFile(__dirname + '/add-staff.html'); 
});
app.get('/add-course', (req, res) => {
  res.sendFile(__dirname + '/add-course.html'); 
});

app.get('/add-enrollment', (req, res) => {
  res.sendFile(__dirname + '/add-enrollment.html'); 
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


app.post('/departments', async (req, res) => {
  const { department_name } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO departments (department_name) VALUES ($1) RETURNING *',
      [department_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/teachers', async (req, res) => {
  const { first_name, last_name, email, department_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO teachers (first_name, last_name, email, department_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, department_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/students', async (req, res) => {
  const { first_name, last_name, date_of_birth, email } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO students (first_name, last_name, date_of_birth, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, date_of_birth, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/courses', async (req, res) => {
  const { course_name, course_code, credits, department_id, teacher_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO courses (course_name, course_code, credits, department_id, teacher_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [course_name, course_code, credits, department_id, teacher_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/enrollments', async (req, res) => {
  const { student_id, course_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) RETURNING *',
      [student_id, course_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/grades', async (req, res) => {
  const enrollment_id = req.body["enrollment_id"];
    const grade = req.body["grade"];

  try {
    const result = await db.query(
      'INSERT INTO grades (enrollment_id, grade) VALUES ($1, $2) RETURNING *',
      [enrollment_id, grade]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/prerequisites', async (req, res) => {
  const { course_id, prerequisite_course_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO course_prerequisites (course_id, prerequisite_course_id) VALUES ($1, $2) RETURNING *',
      [course_id, prerequisite_course_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/materials', async (req, res) => {
  const { course_id, title, file_url, uploaded_by } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO course_materials (course_id, title, file_url, uploaded_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_id, title, file_url, uploaded_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/exams', async (req, res) => {
  const { course_id, exam_name, exam_date, duration_minutes, max_score } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO exams (course_id, exam_name, exam_date, duration_minutes, max_score) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [course_id, exam_name, exam_date, duration_minutes, max_score]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/results', async (req, res) => {
  const { exam_id, student_id, score, remarks } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO exam_results (exam_id, student_id, score, remarks) VALUES ($1, $2, $3, $4) RETURNING *',
      [exam_id, student_id, score, remarks]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/timetables', async (req, res) => {
  const { course_id, teacher_id, day_of_week, start_time, end_time, room_number } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO timetables (course_id, teacher_id, day_of_week, start_time, end_time, room_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [course_id, teacher_id, day_of_week, start_time, end_time, room_number]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/feedback', async (req, res) => {
  const { student_id, teacher_id, course_id, rating, comment } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO feedback (student_id, teacher_id, course_id, rating, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [student_id, teacher_id, course_id, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/staff', async (req, res) => {
  const { first_name, last_name, role, email, department_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO staff (first_name, last_name, role, email, department_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, role, email, department_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});