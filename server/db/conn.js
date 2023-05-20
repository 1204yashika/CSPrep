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
        return {"status":"success","username":x["username"]}
      }
    }
    catch(err){
      return err.message;
    }
}
async function createdefaultexam(id,rstr) {
  await client.connect();
  var db = await client.db("csprep_db");
  var qdb = await db.collection("questions");
  if(id!="CUSTOM"){
    var q = await qdb.find({Qid: new RegExp(id, 'i')});
    var qs = []
    await q.forEach(b=>qs.push(b));
    return qs;
  }
  else{
    var r = rstr;
    var qs = [];
    for(i of r){
      var q = await qdb.find({Topic: i["name"]}).limit(parseInt(i["value"]));
      await q.forEach(b=>qs.push(b));
    }
    return qs;
  }
  
}

async function sendExamData(eid,rand,email){
  await client.connect();
  var db = await client.db("csprep_db");
  var exams = await db.collection("exams");
  try{
    var date = new Date();
    var rest = [];
    if(eid == "CUSTOM"){
      rest = JSON.parse(rand)
    }
    var res = await exams.insertOne({eid:eid,rstr:rest,email:email,starttime:date.getTime(),endtime:"",answers:[]});
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

async function saveAnswers(id,ans){
  await client.connect();
  var db = await client.db("csprep_db");
  var exams = await db.collection("exams");
  await exams.updateOne(
    { "_id": new ObjectId(id) },
    { "$push": { "answers": ans } }
  )
  return "success";
}

async function sendResponse(id){
  var date = new Date();
  await client.connect();
  var db = await client.db("csprep_db");
  var exams = await db.collection("exams");
  await exams.updateOne(
    { "_id": new ObjectId(id) },
    { "$set": { "endtime": date.getTime() } }
  )
  var q = await exams.find({"_id": new ObjectId(id)});
  var qs = []
  await q.forEach(b=>qs.push(b));
  return qs;
}

module.exports = {createdefaultexam, addUser, checkUser, sendExamData, searchexamid, saveAnswers, sendResponse};
