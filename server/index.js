const fs = require("fs");
const express = require("express");
const app = express();
const conn = require("./db/conn.js");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path');

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "Gla2023",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res)=>{
    if (req.session.username) {
        res.redirect("/Home");
    }
    else {
        // req.session.username = "programmerscommunityofficial@gmail.com";
        // req.session.examid = "64327de7489e7a5e888bb5ce";
        res.sendFile("/client/index.html", {'root': './'});
    }
    
});
app.get('/faq', (req, res)=>{
    if (req.session.username) {
        res.sendFile("/client/faq.html", {'root': './'});
    }
    else {
        // req.session.username = "1204yashikaagrawal@gmail.com";
        // req.session.examid = "64327de7489e7a5e888bb5ce";
        res.sendFile("/client/index.html", {'root': './'});
        res.status(400);
    }
    
});

app.get('/profile', (req, res)=>{
    if (req.session.username) {
        res.sendFile("/client/profile.html", {'root': './'});
    }
    else {
        // req.session.username = "1204yashikaagrawal@gmail.com";
        // req.session.examid = "64327de7489e7a5e888bb5ce";
        res.sendFile("/client/index.html", {'root': './'});
        res.status(400);
    }
    
});

app.get('/Home', (req, res)=>{
    if (req.session.username) {
        res.sendFile("/client/Home.html", {'root': './'});
    }
    else {
        res.redirect("/");
    }
});
rdata = {}
app.post('/setResultData',(req,res)=>{
    if(req.session.username){
        rdata = req.body;
        console.log(rdata);
        res.send("");
    }
    else {
        res.redirect("/");
    }
    
})
app.get('/Result',(req,res)=>{
    if(req.session.username){
        res.sendFile("/client/Result.html", {'root': './'});
    }
    else {
        res.redirect("/");
    }
})

app.get('/getResultData',(req,res)=>{
    if(req.session.username){
        res.send(rdata);
    }
    else {
        res.redirect("/");
    }
})

app.post("/register",(req,res)=>{
    let data = req.body;
    data["_id"]=data["email"];
    delete data["email"];
    conn.addUser(data).then(function(r){
        if(r=="success"){
            res.status(200);
            res.send(r);
        }
        else{
            res.status(400);
            res.send(r);
        }
    });
})

app.post("/login",(req,res)=>{
    let data = req.body;
    data["_id"]=data["email"];
    delete data["email"];
    conn.checkUser(data).then(function(resp){
        if(resp["status"]=="success"){
            res.status(200);
            req.session.username = data["_id"];
            res.send(resp);
            console.log(resp);
        }
        else{
            res.status(400);
            res.send(resp);
            console.log(resp);
        }
    });
    
})

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})
app.listen(3000, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ 3000)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.get("/takeexam",(req,res)=>{
    if (req.session.username) {
        var resp = req.query;
        var eid = resp["eid"];
        var rand = {};
        if(eid=="CUSTOM"){
            rand = resp["randomstring"];
            if(rand==null){
                res.redirect("/");
            }
            conn.sendExamData(eid,rand,req.session.username).then(function(r2){
                req.session.examid = r2;
                res.sendFile("/client/exam.html",{'root':'./'});
            });
        }
        conn.sendExamData(eid,rand,req.session.username).then(function(r2){
            req.session.examid = r2;
            res.sendFile("/client/exam.html", {'root': './'});
        });
    }
    else {
        res.redirect("/");
    }
})

app.get('/data',(req,res)=>{
    res.status(200);
    if(req.session.username){
        var eid;
        var rstr;
        conn.searchexamid(req.session.examid).then(function(results ){
            conn.createdefaultexam(results[0]["eid"],results[0]["rstr"]).then(function(examdata){
                return res.send(examdata);
            });
        });
    }
    else{
        res.redirect("/");
    }
});


app.get("/submitQuestion",(req,res)=>{
    if (req.session.username){
        var resp = req.query;
        conn.saveAnswers(req.session.examid,resp).then(r=>r);
        res.send("");
    }
    else {
        res.redirect("/");
    }
});

app.post("/submitPaper",(req,res)=>{
    if (req.session.username){
        var resp = req.body;
        conn.sendResponse(req.session.examid).then(function(r){
            res.send(r);
        });     
    }
    else {
        res.redirect("/");
    }
});




