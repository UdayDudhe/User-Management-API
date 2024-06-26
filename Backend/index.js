const exp = require("express");
const connection = require("./DatabaseConnection/dbConnection");
var bodyParser = require("body-parser");
const cors=require("cors");
const app = exp();
app.use(cors());
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

// DELETE one user
app.delete("/deleteUser/:user_id", function (req, res) {
  const userId = req.params.user_id;

  connection.query(
    "DELETE FROM user_table WHERE user_id = ?",
    [userId],
    function (err, result) {
      if (err) {
        console.error("Error deleting user:", err);
        res.status(500).send("Error deleting user");
      } else {
        console.log("User deleted successfully");
        res.status(200).send("User deleted successfully");
      }
    }
  );
});

// POST endpoint to approve a user
app.post("/approveUser", function (req, res) {
  const userId = req.body.user_id;

  connection.query(
    "UPDATE user_table SET is_approved = 1 WHERE user_id = ?",
    [userId],
    function (err, result) {
      if (err) {
        console.error("Error approving user:", err);
        res.status(500).send("Error approving user");
      } else {
        if (result.affectedRows === 1) {
          console.log("User approved successfully");
          res.status(200).send("User approved successfully");
        } else {
          console.log("User not found");
          res.status(404).send("User not found");
        }
      }
    }
  );
});

// POST endpoint to disapprove a user
app.post("/disapproveUser", function (req, res) {
  const userId = req.body.user_id;

  connection.query(
    "UPDATE user_table SET is_approved = 0 WHERE user_id = ?",
    [userId],
    function (err, result) {
      if (err) {
        console.error("Error disapproving user:", err);
        res.status(500).send("Error disapproving user");
      } else {
        if (result.affectedRows === 1) {
          console.log("User disapproved successfully");
          res.status(200).send("User disapproved successfully");
        } else {
          console.log("User not found");
          res.status(404).send("User not found");
        }
      }
    }
  );
});



//create new user - register
app.post('/register', (req, res) => {
  const { username, password, first_name, last_name, email } = req.body;
  console.log('Username:', username);
  console.log('Password:', password);
  console.log('First Name:', first_name);
  console.log('Last Name:', last_name);
  console.log('Email:', email);
  const role_id=2;
  const is_approved=0;
  connection.query('SELECT * FROM user_table WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Insert new user into database
    connection.query('INSERT INTO user_table (username, password, first_name, last_name, email_id,role_id,is_approved) VALUES (?, ?, ?,?,?, ?, ?)', 
      [username, password, first_name, last_name, email,role_id,is_approved],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const query = "SELECT * FROM user_table WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).send("Error logging in");
    }

    if (results.length === 1) {
      const user = results[0];
      if (user.role_id === 1) {
        return res.status(200).send("Admin login successful");
      } else if (user.role_id === 2) {
        if (user.is_approved === 1) {
          return res.status(200).send("User login successful");
        } else {
          return res.status(403).send("User not approved by admin");
        }
      } else {
        return res.status(401).send("Unauthorized");
      }
    } else {
      return res.status(401).send("Invalid username or password");
    }
  });
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
