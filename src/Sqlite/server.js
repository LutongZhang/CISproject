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

app.get('/Home', (req, res) => {
    let sql = `SELECT * 
           FROM FLOWERS`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    });
});
app.get('/req', async (req, res) => {
    let comName = req.query.name;

    let sql = `SELECT *
                FROM SIGHTINGS
                WHERE name = "${comName}"
                ORDER BY sighted DESC`
    db.all(sql, [], (err, rows) => {
        //console.log(comName)
        if (err) {
            throw err;
        }
        res.send(rows)
    })

})

app.post('/Update', (req, res) => {
    let genus = req.body.update.genus;
    let species = req.body.update.species;
    let comName = req.body.update.comname;
    let choseFlower = req.body.choseFlower;

    let sql = `UPDATE FLOWERS set GENUS = "${genus}",SPECIES = "${species}",COMNAME = "${comName}" where COMName = "${choseFlower}"`
    db.run(sql, (err) => {
        if (err) {
            res.end("fail to updata");
        }
    });
    res.end("success to Update")
})


app.post('/Insert', (req, res) => {
    let person = req.body.insert.person;
    let location = req.body.insert.location;
    let sighted = req.body.insert.sighted;
    let choseFlower = req.body.choseFlower;
    let sql = `INSERT into SIGHTINGS values ("${choseFlower}","${person}","${location}", "${sighted}")`
    db.run(sql, (err) => {
        if (err) {
            res.end("fail to Insert")
        }
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));