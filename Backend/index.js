const exp = require("express");
const connection = require("./DatabaseConnection/dbConnection");
var bodyParser = require("body-parser");

const app = exp();
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
  console.log("inside get one user ");
  console.log(req.query.user_id);
  const userid = req.query.user_id;
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
  console.log(req.query.user_id);
  const userid = req.query.user_id;
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
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);
  const nm = req.body.username;
  const pwd = req.body.password;
  const roleid = 2;
  connection.query(
    "Insert into user_table(username,password,role_id) values(?,?,?)",
    [nm, pwd, roleid],
    function (err, result) {
      console.log("query hitted");
      if (err) {
        console.log(err);
        res.send("Error in inserting data");
      } else {
        res.send(result);
      }
    }
  );
});

//update data
app.put("/update", function (req, res) {
  console.log("hitted");
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);
  const nm = req.body.username;
  const pwd = req.body.password;
  const roleid = 6;
  connection.query(
    "Update user_table set username=?,password=? where user_id=?",
    [nm, pwd, roleid],
    function (err, result) {
      console.log("query hitted");
      if (err) {
        console.log(err);
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
