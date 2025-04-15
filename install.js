/** Moment 1 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */

const sqlite3 = require('sqlite3').verbose();

//skapar databasen
const db = new sqlite3.Database("./db/cv.db");

//skapar tabell (id, coursecode, coursename, syllabus, progression)
db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS courses;`)

    db.run(`CREATE TABLE IF NOT EXISTS courses (
                CourseID INTEGER PRIMARY KEY AUTOINCREMENT,
                CourseCode TEXT NOT NULL,
                CourseName TEXT NOT NULL,
                Syllabus TEXT,
                Progression TEXT, 
                Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
});

db.close();