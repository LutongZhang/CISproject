const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(__dirname + './flowers.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    let sql = `SELECT *
           FROM FLOWERS`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));