var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
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
                // Table already created
            }else{
                // Table just created, creating some rows
                //var insert = 'INSERT INTO user (type, symbol,shares,price,user_id,user_name, timestamp) VALUES (?,?,?,?,?,?,?)'
               // db.run(insert, ["abuy","$",md5("admin123456")])
                //db.run(insert, ["user","user@example.com",md5("user123456")])
            }
        });  
    }
});


module.exports = db