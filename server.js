/** Moment 1 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */

//skapar webbserver och body-parser för att läsa in formulärdata
const express = require("express");
const bodyparser = require("body-parser");

//använder sqlite som databas
const sqlite3 = require('sqlite3');

//skapar databasen cv.db
const db = new sqlite3.Database("./db/cv.db", (err) => {
    //felmeddelande vid fel när databasen skapas
    if (err) {
        throw err;
    }
});

//Server inställningar
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");              //view
app.use(express.static("public"));          //public
app.use(bodyparser.urlencoded({ extended: true }));

//routing startsida
app.get("/", (req, res) => {
    //Skriver ut kurserna från databasen
    db.all('SELECT * FROM courses ORDER BY CourseID DESC;', (err, rows) => {
        if (err) {
            //felmeddande i konsoll och utskriver
            console.error(err.message);
            res.render("index", {
                rows: [],
                error: "Fel vid hämtning av kurser."
            });
        }

        //hämtade kurser skrivs ut
        res.render("index", {
            rows: rows,
            error: ""
        });
    });
});

//Formulärsida
app.get("/addcourse", (req, res) => {
    res.render("addcourse", {
        errors: [],
        newCourseCode: "",
        newCourseName: "",
        newSyllabus: "",
        newProgression: "",
        posted: ""
    });
});

//Formulärsida - post för att lägga till kurser
app.post("/addcourse", (req, res) => {
    //hämtar värdena från formuläret
    const newCourseCode = req.body.newCourseCode;
    const newCourseName = req.body.newCourseName;
    const newSyllabus = req.body.newSyllabus;
    const newProgression = req.body.newProgression;
    const errors = [];

    //validering - tomt fält = felmeddelande
    if (newCourseCode === "" || newCourseName === "" || newSyllabus === "" || newProgression === "") {
        errors.push("Alla fält måste vara ifyllda!");
    };

    //vid felmeddelande renderas formuläret igen med den ifyllda värdena kvar
    if (errors.length > 0) {
        return res.render("addcourse", {
            errors: errors,
            newCourseCode,
            newCourseName,
            newSyllabus,
            newProgression,
            posted: ""
        });

    } else {
        //kursen läggs till i databasrn om allt är korrekt
        db.run(`INSERT INTO courses (courseCode, courseName, syllabus, progression) 
        VALUES (?, ?, ?, ?)`, [newCourseCode, newCourseName, newSyllabus, newProgression], function (err) {
            if (err) {
                //felmeddeland vod fel av insättning i tabell
                console.error(err.message);
                return res.render("addcourse", {
                    errors: ["Kursen kunde inte läggas till, försök igen."],
                    newCourseCode: "",
                    newCourseName: "",
                    newSyllabus: "",
                    newProgression: "",
                    posted: ""
                });
            }

            //formulär töms och bekräftelse skrivs ut när kursen lagts till
            res.render("addcourse", {
                errors: [],
                newCourseCode: "",
                newCourseName: "",
                newSyllabus: "",
                newProgression: "",
                posted: "Kursen är tillagd!"
            });
        });
    }
});

//ta bort kurs baserat på id
app.get("/deletecourse/:id", (req, res) => {
    const id = req.params.id;

    //tar bort kurs vars id matchar tabellen
    db.run("DELETE FROM courses WHERE CourseID = ?;", id, (err) => {
        if(err) {
            //felmeddelande i konsoll
            console.error(err.message);
        }
        //redirect till startsidan
        res.redirect("/");
    });
});

//om-sidan
app.get("/about", (req, res) => {
    res.render("about");
});

//startar servern
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});