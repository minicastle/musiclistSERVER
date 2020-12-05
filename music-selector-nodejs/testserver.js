const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.listen(port,function(){
    console.log(`Listening on port 5000`);
});

app.get("/arlist",function(req,res){
    res.send(`<p>build Success!</p>`)
});