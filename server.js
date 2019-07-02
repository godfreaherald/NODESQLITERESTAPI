// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var bodyParser = require("body-parser");
const tradesRouter = require("./routes/trades")


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//direct all root API calls to the trades router
app.use("/" ,tradesRouter)



// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});




// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
