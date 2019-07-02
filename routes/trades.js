
const router = require("express").Router()
var db = require("../database.js")
//import { Router as router } from "express";

let types = ["buy","sell"];

router.get('/',(req, res, next) => {
     db.run(
        'DELETE FROM trades' ,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.status(200);
    });
});

router.get("/trades", (req, res, next) => {
    
    var sql = "select * from trades order by id asc"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({
            "message":"success",
            "data":rows
        })
      });
});

router.get("/trades/users/:id", (req, res, next) => {
    
    let sql = "select * from trades where user_id = ? order by id asc"
   let params = [req.params.id]
   db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({
            "message":"success",
            "data":rows
        })
      });
});

router.get("/trades/users/:symbol/trades", (req, res, next) => {
    
    let sql = "select * from trades where symbol = ? and timestamp between ? and ? order by id asc"
   let params = [req.params.symbol,req.query.start,req.query.end]
   db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(404).json({"error":err.message});
          return;
        }
        res.status(200).json({
            "message":"success",
            "data":rows
        })
      });
});

router.get("/trades/users/:symbol/price", (req, res, next) => {
    
    let sql = "select min(price),max(price),symbol from trades where symbol = ? and timestamp between ? and ? order by id asc"
   let params = [req.params.symbol,req.query.start,req.query.end]
   db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(404).json({
            "message":"success",
              "error":err.message
            });
          return;
        }
        res.status(200).json({
            "message":"success",
            "data":rows
        })
      });
});







router.post("/trades", (req, res, next) => {
    var errors=[]
    if (!req.body.type){
        errors.push("No type specified");
    }

    if (!types.includes(req.body.type)){
        errors.push("invalid Type");
    }

    if (!req.body.symbol){
        errors.push("No symbol specified");
    }
    if (!req.body.shares){
        errors.push("No shares specified");
    }

    if (!req.body.price){
        errors.push("price must be specified");
    }
    if (!req.body.user.id){
        errors.push("User id cannot be null");
    }

    if (!req.body.user.name){
        errors.push("User name cannot be null");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        username: req.body.user.name,
        user_id: req.body.user.id,
        price :req.body.price,
        shares : req.body.shares,
        symbol : req.body.symbols,
        type : req.body.type,
        timestamp: req.body.timestamp

    }
    let sql = 'INSERT INTO trades (type, symbol,shares,price,user_id,user_name,timestamp)VALUES (?,?,?,?,?,?,?)'
    //var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.type,data.symbol,data.shares,data.price,data.user_id,data.username,data.timestamp];
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.status(200)
        
        return;
        /*res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })*/
    });
})


module.exports = router;