var mysql = require('mysql-await');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gla@2023",
  database: "gate_db"
});
con.on(`error`, (err) => {
    console.error(`Connection error ${err.code}`);
  });

async function runquery(q) {
    let result = await con.awaitQuery(q);
    return result;
}

module.exports = { runquery };