const { MongoClient } = require("mongodb");
let url = `mongodb+srv://1204yashikaagrawal:Yashi1204@cluster0.qqgtc8o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
async function run() {
    await client.connect();
    var db = await client.db("csprep_db");
    var questions = await db.collection("questions");
    var q1 = await questions.find({Correct: 1});
    var qs = []
    await q1.forEach(b=>qs.push(b));
    return qs;
}
async function addUser(myobj){
    await client.connect();
    var db = await client.db("csprep_db");
    var questions = await db.collection("users");
    try{
      await questions.insertOne(myobj);
      return "success";
    }
    catch(err){
      return err.message;
    }
    
}

async function checkUser(myobj){
  await client.connect();
    var db = await client.db("csprep_db");
    var questions = await db.collection("users");
    try{
      var x = await questions.findOne(myobj);
      if (x == null) {
        return {"status":"failed","message":"Invalid username and password combination"}
      }
      else {
        return {"status":"success","name":x["name"]}
      }
    }
    catch(err){
      return err.message;
    }
}

async function sendExamData(eid,rand,email){
  await client.connect();
  var db = await client.db("csprep_db");
  var exams = await db.collection("exams");
  try{
    var res = await exams.insertOne({eid:eid,rstr:rand,email:email,starttime:"",endtime:"",answers:{}});
    return res.insertedId.toString();
  }
  catch(err){
    return err.message;
  }
}
module.exports = {run, addUser, checkUser, sendExamData};
// run().then(a=>console.log(a))

// var mysql = require('mysql-await');
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Gla@2023",
//   database: "gate_db"
// });
// con.on(`error`, (err) => {
//     console.error(`Connection error ${err.code}`);
//   });

// async function runquery(q) {
//     let result = await con.awaitQuery(q);
//     return result;
// }

// module.exports = { runquery };