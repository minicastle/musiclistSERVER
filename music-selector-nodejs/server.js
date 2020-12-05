const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000
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

app.listen(port,function(){
    console.log(`Listening on port 5000`);
});

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

    app.post("/musiclist/create_process",function(req,res){
    if(req.body.list==="ArList"){
        db.query(`INSERT INTO arlist(arlist_title,arlist_singer,arlist_link,arlist_author_id,arlist_created) VALUES(?,?,?,?,NOW())`,[req.body.title,req.body.singer,req.body.Url,1],function(err,result){
            if(err)throw err;
            res.writeHead(302,{Location:`http://localhost:3000/`});
            res.end();
        });
    }
    if(req.body.list === "Mrist"){
        db.query(`INSERT INTO mrlist(mrlist_title,mrlist_singer,mrlist_link,mrlist_author_id,mrlist_created) VALUES(?,?,?,?,NOW())`,[req.body.title,req.body.singer,req.body.Url,1],function(err,result){
            if(err)throw err;
            res.writeHead(302,{Location:`http://localhost:3000/`});
            res.end();
        });
    }
    });

    app.post("/musiclist/delete_process_arlist",function(req,res){
        db.query(`DELETE FROM arlist WHERE arlist_id=?`,[req.body.id],function(err,result){
            if(err)throw err;
            res.writeHead(302,{Location:`http://localhost:3000/`})
            res.end();
        });
    });
    app.post("/musiclist/delete_process_mrlist",function(req,res){
        db.query(`DELETE FROM mrlist WHERE mrlist_id=?`,[req.body.id],function(err,result){
            if(err)throw err;
            res.writeHead(302,{Location:`http://localhost:3000/`})
            res.end();
        });
    });
    app.post("/musiclist/update_process_arlist",function(req,res){
        db.query(`UPDATE arlist SET arlist_title = ?,arlist_link = ? WHERE arlist_id = ?`,[req.body.title,req.body.url,req.body.id],function(err,result){
            if(err)throw err;
            res.writeHead(302,{Location:`http://localhost:3000/`})
            res.end();
        })
    });
    app.post("/musiclist/update_process_mrlist",function(req,res){
        db.query(`UPDATE mrlist SET mrlist_title = ?,mrlist_link = ? WHERE mrlist_id = ?`,[req.body.title,req.body.url,req.body.id],function(err,result){
            if(err)throw err;
            res.writeHead(302,{Location:`http://localhost:3000/`})
            res.end();
        })
    });