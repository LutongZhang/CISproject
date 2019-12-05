const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(__dirname + './flowers.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

let sql = `CREATE TRIGGER t AFTER INSERT on SIGHTINGS
            BEGIN
            SELECT RAISE(ABORT,'insert success');
            END`

// db.run(sql, (err) => {

// })