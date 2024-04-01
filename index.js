const express = require("express");
const connection = require("./DatabaseConnection/dbConnection");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is Running");
});
//get all the users
app.get("/getAllUsers", function (req, res) {
  // console.log("hit")
  // const body=req.body;
  // console.log(body);
  // res.writeHead('content-type'='text/html');
  // res.send(body);
  connection.query("select * from user_table", function (err, result) {
    // console.log("get all users hit");
    // res.send(result);
    if(err){
        //console.log(err);
    }
    else{
        res.send(result)
    }
  });
});
//get one user
app.get("/getOneUser", function (req, res) {
  console.log(req.body.user_id);
  const userid = req.body.user_id;
  connection.query(
    "select * from user_table where user_id=?",
    [userid],
    function (err, result) {
      // console.log("get one user hit");
      // console.log(result);
      //   res.send(result);
      if (err) {
        res.send("Error Fetching Data");
      } else {
        res.send(result);
      }
    }
  );
});
//delete one user
app.get("/deleteOneUser", function (req, res) {
  console.log(req.body.user_id);
  const userid = req.body.user_id;
  connection.query(
    "delete from user_table where user_id=?",
    [userid],
    function (err, result) {
      // console.log("delete one user hit");
      // console.log(result);
      // res.send(result);
      if (err) {
        res.send("Error Fetching Data");
      } else {
        res.send(result);
      }
    }
  );
});

//create new user - register

app.post("/register", function (req, res) {
  console.log("hitted");
  const nm = req.body.username;
  const pwd = req.body.password;
  const roleid = 2;
  connection.query(
    "Insert into user_table(username,password,role_id) values(?,?,?)",
    [nm, pwd, roleid],
    function (err, result) {
      console.log("query hitted");
      if (err) {
        //console.log(err);
        res.send("Error in inserting data");
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(process.env.PORT || 4000, function () {
  console.log(`Server Started at ${process.env.PORT}`);
});
