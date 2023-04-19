const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
let url = `mongodb+srv://1204yashikaagrawal:Yashi1204@cluster0.qqgtc8o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

//for registration 
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

//for login
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
async function createdefaultexam(id) {
  await client.connect();
  var db = await client.db("csprep_db");
  var qdb = await db.collection("questions");
  var q = await qdb.find({Qid: new RegExp(id, 'i')});
  var qs = []
  await q.forEach(b=>qs.push(b));
  return qs;
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

async function searchexamid(id) {
  await client.connect();
  var db = await client.db("csprep_db");
  console.log(id);
  var exams = await db.collection("exams");
  var q = await exams.find({_id: new ObjectId(id)});
  var qs = []
  await q.forEach(b=>qs.push(b));
  return qs;
}


module.exports = {createdefaultexam, addUser, checkUser, sendExamData, searchexamid};
