const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(__dirname + './flowers2.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

let sql = `create index sighted on SIGHTINGS(sighted)`

db.run(sql)