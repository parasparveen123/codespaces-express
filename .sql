-- ####################################################
-- #  🎓 STUDENT MANAGEMENT SYSTEM (PAKISTAN CONTEXT) #
-- ####################################################

-- 🔹 1. departments
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
);

-- 🔹 2. teachers
CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT REFERENCES departments(department_id)
);

-- 🔹 3. students
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(100) UNIQUE,
    enrollment_date DATE DEFAULT CURRENT_DATE
);

-- 🔹 4. courses
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    credits INT NOT NULL CHECK (credits BETWEEN 1 AND 5),
    department_id INT REFERENCES departments(department_id),
    teacher_id INT REFERENCES teachers(teacher_id)
);

-- 🔹 5. enrollments
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    enrollment_date DATE DEFAULT CURRENT_DATE,
    UNIQUE(student_id, course_id)
);

-- 🔹 6. grades
CREATE TABLE grades (
    grade_id SERIAL PRIMARY KEY,
    enrollment_id INT REFERENCES enrollments(enrollment_id),
    grade CHAR(2) NOT NULL CHECK (grade IN ('A', 'B', 'C', 'D', 'F')),
    graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🔹 7. course_prerequisites
CREATE TABLE course_prerequisites (
    course_id INT REFERENCES courses(course_id),
    prerequisite_course_id INT REFERENCES courses(course_id),
    PRIMARY KEY (course_id, prerequisite_course_id)
);

-- 🔹 8. course_materials
CREATE TABLE course_materials (
    material_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(course_id),
    title VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT REFERENCES teachers(teacher_id)
);

-- 🔹 9. exams
CREATE TABLE exams (
    exam_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(course_id),
    exam_name VARCHAR(100) NOT NULL,
    exam_date DATE NOT NULL,
    duration_minutes INT NOT NULL,
    max_score INT DEFAULT 100
);

-- 🔹 10. exam_results
CREATE TABLE exam_results (
    result_id SERIAL PRIMARY KEY,
    exam_id INT REFERENCES exams(exam_id),
    student_id INT REFERENCES students(student_id),
    score INT CHECK (score >= 0 AND score <= 100),
    remarks TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(exam_id, student_id)
);

-- 🔹 11. timetables
CREATE TABLE timetables (
    timetable_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(course_id),
    teacher_id INT REFERENCES teachers(teacher_id),
    day_of_week VARCHAR(10) CHECK (day_of_week IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(20)
);

-- 🔹 12. feedback
CREATE TABLE feedback (
    feedback_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    teacher_id INT REFERENCES teachers(teacher_id),
    course_id INT REFERENCES courses(course_id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🔹 13. staff
CREATE TABLE staff (
    staff_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT REFERENCES departments(department_id)
);

-- ######################################
-- # ✅ INSERT SAMPLE DATA (PAKISTAN THEME)
-- ######################################

-- 🔹 Insert into departments
INSERT INTO departments (department_name) VALUES
('Computer Science'),
('Electrical Engineering'),
('Business Administration'),
('Islamic Studies');

-- 🔹 Insert into teachers
INSERT INTO teachers (first_name, last_name, email, department_id) VALUES
('Ali', 'Khan', 'ali.khan@nust.edu.pk', 1),
('Ayesha', 'Malik', 'ayesha.m@nust.edu.pk', 2),
('Imran', 'Butt', 'imran.b@nust.edu.pk', 3),
('Zainab', 'Qureshi', 'z.qureshi@nust.edu.pk', 4);

-- 🔹 Insert into students
INSERT INTO students (first_name, last_name, date_of_birth, email) VALUES
('Ahmad', 'Raza', '2002-03-15', 'ahmad.raza@student.nust.edu.pk'),
('Sana', 'Shah', '2001-09-05', 'sana.shah@student.nust.edu.pk'),
('Umar', 'Farooq', '2003-06-20', 'umar.farooq@student.nust.edu.pk'),
('Hira', 'Nazir', '2002-12-25', 'hira.nazir@student.nust.edu.pk');

-- 🔹 Insert into courses
INSERT INTO courses (course_name, course_code, credits, department_id, teacher_id) VALUES
('Programming Fundamentals', 'CS101', 3, 1, 1),
('Digital Electronics', 'EE201', 4, 2, 2),
('Principles of Management', 'BA101', 3, 3, 3),
('Introduction to Quranic Studies', 'IS101', 3, 4, 4);

-- 🔹 Insert into enrollments
INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES
(1, 1, '2025-01-10'),
(1, 2, '2025-01-10'),
(2, 1, '2025-01-11'),
(2, 3, '2025-01-11'),
(3, 2, '2025-01-12'),
(4, 4, '2025-01-12');

-- 🔹 Insert into grades
INSERT INTO grades (enrollment_id, grade, graded_at) VALUES
(1, 'A', '2025-05-10'),
(2, 'B', '2025-05-10'),
(3, 'C', '2025-05-11'),
(4, 'A', '2025-05-11'),
(5, 'B', '2025-05-12'),
(6, 'A', '2025-05-12');

-- 🔹 Insert into course_prerequisites
INSERT INTO course_prerequisites (course_id, prerequisite_course_id) VALUES
(2, 1), -- Digital Electronics requires Programming Fundamentals
(3, 2); -- Principles of Management has Digital Electronics as a prerequisite

-- 🔹 Insert into course_materials
INSERT INTO course_materials (course_id, title, file_url, uploaded_by) VALUES
(1, 'Python Programming Notes', 'https://materials.nust.edu.pk/cs101-python.pdf',  1),
(2, 'Logic Design Lab Manual', 'https://materials.nust.edu.pk/ee201-lab.pdf',  2),
(3, 'Case Studies in Management', 'https://materials.nust.edu.pk/ba101-cases.pdf',  3),
(4, 'Surah Al-Baqarah Tafsir', 'https://materials.nust.edu.pk/is101-tafsir.pdf',  4);

-- 🔹 Insert into exams
INSERT INTO exams (course_id, exam_name, exam_date, duration_minutes, max_score) VALUES
(1, 'Midterm Exam - CS101', '2025-03-15', 90, 100),
(2, 'Final Exam - EE201', '2025-06-01', 120, 100),
(3, 'Midterm - BA101', '2025-03-20', 60, 75),
(4, 'Quiz - IS101', '2025-02-10', 30, 25);

-- 🔹 Insert into exam_results
INSERT INTO exam_results (exam_id, student_id, score, remarks) VALUES
(1, 1, 92, 'Excellent performance'),
(1, 2, 78, 'Good effort'),
(2, 1, 85, 'Well done'),
(2, 3, 67, 'Needs improvement'),
(3, 2, 65, 'Passed'),
(4, 4, 23, 'Very good understanding');

-- 🔹 Insert into timetables
INSERT INTO timetables (course_id, teacher_id, day_of_week, start_time, end_time, room_number) VALUES
(1, 1, 'Monday', '09:00', '10:30', 'A201'),
(2, 2, 'Wednesday', '11:00', '12:30', 'E102'),
(3, 3, 'Tuesday', '13:00', '14:30', 'B105'),
(4, 4, 'Thursday', '08:00', '09:30', 'C301');

-- 🔹 Insert into feedback
INSERT INTO feedback (student_id, teacher_id, course_id, rating, comment, submitted_at) VALUES
(1, 1, 1, 5, 'Very clear lectures and helpful notes.', '2025-04-01'),
(2, 2, 2, 4, 'Good practical examples but slides need updating.', '2025-04-05'),
(3, 3, 3, 3, 'Could add more real-life case studies.', '2025-04-07'),
(4, 4, 4, 5, 'Deeply knowledgeable and inspiring!', '2025-04-10');

-- 🔹 Insert into staff
INSERT INTO staff (first_name, last_name, role, email, department_id) VALUES
('Asad', 'Iqbal', 'Registrar', 'registrar@nust.edu.pk', NULL),
('Nadia', 'Kamal', 'Librarian', 'library@nust.edu.pk', 1),
('Faisal', 'Rao', 'Admin Officer', 'admin@nust.edu.pk', 3),
('Sobia', 'Chaudhary', 'IT Support', 'support@nust.edu.pk', 1);