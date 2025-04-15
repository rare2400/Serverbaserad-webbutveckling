/** Moment 1 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */

const sqlite3 = require('sqlite3').verbose();

//skapar databasen
const db = new sqlite3.Database("./db/cv.db", (err) => {
        //felmeddelande vid fel när databasen skapas
        if (err) {
                throw err;
        }
});

//skapar tabell (id, coursecode, coursename, syllabus, progression)
db.serialize(() => {
        //tar bort tabell om den finns
        db.run(`DROP TABLE IF EXISTS courses;`)

        //skapar tabellen
        db.run(`CREATE TABLE IF NOT EXISTS courses (
                CourseID INTEGER PRIMARY KEY AUTOINCREMENT,
                CourseCode TEXT NOT NULL,
                CourseName TEXT NOT NULL,
                Syllabus TEXT,
                Progression TEXT, 
                Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
                //felmeddelande vid fel när tabellen skapas
                , (err) => {
                        if (err) {
                                console.error("Fel när tabell skapas:", err.message)
                        }
                });
});

//stänger databasen
db.close();