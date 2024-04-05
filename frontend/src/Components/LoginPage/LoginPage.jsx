import React, { useReducer ,useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const init = {
    username: { value: "", valid: false, touched: false, error: "" },
    password: { value: "", alid: false, touched: false, error: "" },
    formValid: false,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        const { key, value, touched, valid, error, formValid } = action.data;
        return { ...state, [key]: { value, touched, valid, error }, formValid };
      case "reset":
        return init;
      default:
        break;
    }
  };
  const [user, dispatch] = useReducer(reducer, init);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  // const sendData = (e) => {
  //   e.preventDefault();
  //   const reqOptions = {
  //     method: "GET",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(user),
  //   };
  //   fetch("http://localhost:8080/getAllUsers", reqOptions)
  //     .then((resp) => {
  //       if (resp.ok) {
  //         return resp.text();
  //       } else {
  //         throw new Error("Service Error");
  //       }
  //     })
  //     .then((resp) => console.log(resp))
  //     .then((resp) => resp.text())
  //     // .then((text) => (text.length ? JSON.parse(text) : {}))
  //     // .then((obj) => {
  //     //   if (Object.keys(obj).length === 0) {
  //     //     setMsg("Account not found");
  //     //   } else {
  //     //     localStorage.setItem('loginId', obj.login_id); 
  //     //     localStorage.setItem('username', obj.username);
  //     //     if (obj.id_approved === false) {
  //     //      setMsg("Request not approved");
  //     //     } else {
  //     //       navigate("/registration");
  //     //     }
  //     //   }
  //     // })
  //     .catch((error) => {
  //       console.log(error);
  //       navigate("/serverError");
  //     });
  //   //.then((obj)=>{console.log(obj)})
  // };
  const validateData = (key, val) => {
    let valid = true;
    let error = "";
    switch (key) {
      case "username":
        let usernamepattern = /^[a-zA-Z0-9]+$/;
        if (!usernamepattern.test(val)) {
          valid = false;
          error = "Enter Valid username";
        }
        break;
      case "password":
        let passwordpattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordpattern.test(val)) {
          valid = false;
          error = "Enter Valid Password";
        }
        break;
      default:
    }
    return { valid: valid, error: error };
  };
  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    let formValid = true;
    for (let k in user) {
      if (user[k].valid === false) {
        formValid = false;
        break;
      }
    }
    console.log(formValid);
    dispatch({
      type: "update",
      data: { key, value, touched: true, valid, error, formValid },
    });
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend API endpoint
    fetch("http://localhost:8080/getAllUsers")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);
  return (
    <>
      <legend>Doctor Registration</legend>
      <p>{JSON.stringify(user)}</p>
      <div className="registration-container">
        <form
          className="form-horizontal needs-validation"
          action=""
          method="POST"
        >
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <label className="control-label" htmlFor="">
                    User Name
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={user.username.value}
                    onChange={(e) => {
                      handleChange("username", e.target.value);
                    }}
                    onBlur={(e) => {
                      handleChange("username", e.target.value);
                    }}
                    placeholder="rajsharma12"
                    required
                  />
                  <div
                    style={{
                      display:
                        user.username.touched && !user.username.valid
                          ? "block"
                          : "none",
                      color: "red",
                    }}
                  >
                    {user.username.error}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="control-label" htmlFor="password">
                    Password
                  </label>
                </td>
                <td>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={user.password.value}
                    onChange={(e) => {
                      handleChange("password", e.target.value);
                    }}
                    onBlur={(e) => {
                      handleChange("password", e.target.value);
                    }}
                    placeholder="Rajsharma@123"
                    required
                  />

                  <div
                    style={{
                      display:
                        user.password.touched && !user.password.valid
                          ? "block"
                          : "none",
                      color: "red",
                    }}
                  >
                    {user.password.error}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="1" className="button-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!user.formValid}
                    // onClick={(e) => sendData(e)}
                  >
                    Register
                  </button>
                </td>

                <td colSpan="1" className="button-center">
                  <button
                    type="reset"
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch({ type: "reset" });
                    }}
                  >
                    Reset
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.role_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default LoginPage;
