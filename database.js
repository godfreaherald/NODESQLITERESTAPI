var sqlite = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS trades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type text, 
            symbol text , 
            shares INTEGER,
            price double, 
            user_id text,
            user_name text,
            timestamp DATETIME 
            )`,
        (err) => {
            if (err) {
                console.error(err.message)
            }else{
                console.log("created the db table") 
            }
        });  
    }
});


module.exports = db