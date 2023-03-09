const fs = require("fs");
const express = require("express");
const app = express();
const conn = require("./db/conn.js");

app.get('/', (req, res)=>{
    res.status(200);
    res.sendFile("/client/Home.html", {'root': './'});
});

app.get('/data',(req,res)=>{
    res.status(200);
    conn.runquery("select * from questions").then(results => res.send(results));
})

app.listen(3000, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ 3000)
    else 
        console.log("Error occurred, server can't start", error);
    }
)

