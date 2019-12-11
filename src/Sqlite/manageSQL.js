const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(__dirname + './flowers.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


//let sql = `create index Location on FEATURES(location)`
//let sql = `create index class on FEATURES(CLASS)`
//let sql = `create index latitude on FEATURES(latitude)`
//let sql = `create index longitude on FEATURES(longitude)`
//let sql = `create index map on FEATURES(map)`
//let sql = `create index elev on FEATURES(ELEV)`
//let sql = `create index genus on FLOWERS(genus)`
//let sql = `create index species on FLOWERS(species)`
//let sql = `create index comname on FLOWERS(COMNAME)`
//let sql = `create index name on MEMBERS(NAME)`
//let sql = `create index membersince on MEMBERS(membersince)`
//let sql = `create index numsightings on MEMBERS(numsightings)`
//let sql = `create index nameSightings on SIGHTINGS(name)`
//let sql = `create index person on SIGHTINGS(person)`
//let sql = `create index locationSightings on SIGHTINGS(location)`
//let sql = `create index sighted on SIGHTINGS(sighted)`
