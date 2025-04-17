/** Moment 1 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */

//skapar webbserver och body-parser för att läsa in formulärdata
const express = require("express");
const bodyparser = require("body-parser");

//använder sqlite som databas
const sqlite3 = require('sqlite3').verbose();

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

//startar servern
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});