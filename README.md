# Databaserat CV

Detta projekt är en webbapplikation byggd med Node.js, Express, EJS och SQLite. Applikationen ger en överblick över kurser som har lästs och ger möjlighet att enkelt lägga till och ta bort kurser.

## Funktioner

- **Startsida med kursöversikt:**  
  En tabell visar samtliga kurser i databasen, inklusive kurskod, kursnamn, progression, länk till kursplan samt tid för när kursen lades till. Det finns även en "Radera"-knapp för att ta bort en vald kurs ur tabellen och databasen.

- **Lägga till kurser:**  
  En formulärsida där användaren fyller i information om en kurs. Alla fält måste vara ifyllda för att kursen ska kunna sparas. Vid lyckad inmatning visas en bekräftelse på sidan.

- **Om-sida:**  
  Innehåller information om webbplatsens syfte, tekniker som använts och slutsatser från utvecklingsarbetet.

## Teknisk information

- **Backend:** Node.js + Express
- **Templating:** EJS
- **Databas:** SQLite
- **Databasstruktur:**  
  En tabell `courses` med följande kolumner:
  - `CourseID` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
  - `courseCode` (TEXT)
  - `courseName` (TEXT)
  - `syllabus` (TEXT)
  - `progression` (TEXT)
