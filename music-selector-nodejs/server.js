const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = process.env.PORT||5000;
const mysql = require("mysql");
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"tjdals1278",
    database:"musiclist"
});

db.connect();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get("/musiclist/arlist",function(req,res){
    db.query(`SELECT * FROM arlist`,function(err,arlist){
        if(err)throw err;
        res.send(arlist);
    });
});

app.get("/musiclist/mrlist",function(req,res){
    db.query(`SELECT * FROM mrlist`,function(err,mrlist){
        if(err)throw err;
        res.send(mrlist);
    });
});

app.listen(port,function(){
    console.log(`Listening on port ?`,[port]);
})