import React, {useReducer } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const init = {
    userName: { value: "", valid: false, touched: false, error: "" },
    password: { value: "", valid: false, touched: false, error: "" },
    firstName: { value: "", valid: false, touched: false, error: "" },
    lastName: { value: "", valid: false, touched: false, error: "" },
    email: { value: "", valid: false, touched: false, error: "" },
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
    }
  };
  const [user, dispatch] = useReducer(reducer, init);
  const navigate = useNavigate();

  const sendData = (e) => {

    console.log(JSON.stringify({
      username: user.userName.value,
      password: user.password.value,
      first_name: user.firstName.value,
      last_name: user.lastName.value,
      email: user.email.value,
    }));

    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: user.userName.value,
        password: user.password.value,
        first_name: user.firstName.value,
        last_name: user.lastName.value,
        email: user.email.value,
      }),
    };
    fetch("http://localhost:8080/register", reqOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json(); 
        } else {
          throw new Error("Cannot Register");
        }
      })
      .then((obj) => {
        console.log(obj);
        alert("Successfully Registered");
        navigate("/");
      })
      .catch((error) => alert("Server Error: Cannot Register"));
  };

  const validateData = (key, val) => {
    let valid = true;
    let error = "";

    switch (key) {
      case "userName":
        let patteruserName = /^[a-zA-Z0-9]+$/;
        if (!patteruserName.test(val)) {
          valid = false;
          error = "Enter Valid User Name";
        }
        break;
      case "password":
        let patternpassword =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!patternpassword.test(val)) {
          valid = false;
          error = "Enter Valid Password";
        }
        break;
      case "firstName":
        let patterfirstName = /^[A-Z]{1}[a-z]{1,}$/;
        if (!patterfirstName.test(val)) {
          valid = false;
          error = "Enter Valid Name - First Letter Capital";
        }
        break;
      case "lastName":
        let patternlastName = /^[A-Z]{1}[a-z]{1,}$/;
        if (!patternlastName.test(val)) {
          valid = false;
          error = "Enter Valid Name - First Letter Capital";
        }
        break;
      case "email":
        let patternemail = /^[\w._#-]{4,20}@[\w-]{5,15}\.[a-z]{2,3}$/;
        if (!patternemail.test(val)) {
          valid = false;
          error = "Invalid Email ID";
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

  return (
    <>
      <legend>User Registration</legend>
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
                    id="userName"
                    name="userName"
                    value={user.userName.value}
                    onChange={(e) => {
                      handleChange("userName", e.target.value);
                    }}
                    onBlur={(e) => {
                      handleChange("userName", e.target.value);
                    }}
                    placeholder="rajsharma12"
                    required
                  />
                  <div
                    style={{
                      display:
                        user.userName.touched && !user.userName.valid
                          ? "block"
                          : "none",
                      color: "red",
                    }}
                  >
                    {user.userName.error}
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
                <td>
                  <label className="control-label" htmlFor="firstName">
                    First Name
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={user.firstName.value}
                    onChange={(e) => {
                      handleChange("firstName", e.target.value);
                    }}
                    onBlur={(e) => {
                      handleChange("firstName", e.target.value);
                    }}
                    placeholder="Raj"
                    required
                  />
                  <div
                    style={{
                      display:
                        user.firstName.touched && !user.firstName.valid
                          ? "block"
                          : "none",
                      color: "red",
                    }}
                  >
                    {user.firstName.error}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="control-label" htmlFor="lastName">
                    Last Name
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={user.lastName.value}
                    onChange={(e) => {
                      handleChange("lastName", e.target.value);
                    }}
                    onBlur={(e) => {
                      handleChange("lastName", e.target.value);
                    }}
                    placeholder="Patel"
                    required
                  />
                  <div
                    style={{
                      display:
                        user.lastName.touched && !user.lastName.valid
                          ? "block"
                          : "none",
                      color: "red",
                    }}
                  >
                    {user.lastName.error}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="control-label" htmlFor="email">
                    Email
                  </label>
                </td>
                <td>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="RajPatel@gmail.com"
                    value={user.email.value}
                    onChange={(e) => {
                      handleChange("email", e.target.value);
                    }}
                    onBlur={(e) => {
                      handleChange("email", e.target.value);
                    }}
                    required
                  />
                  <div
                    style={{
                      display:
                        user.email.touched && !user.email.valid
                          ? "block"
                          : "none",
                      color: "red",
                    }}
                  >
                    {user.email.error}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="1" className="button-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!user.formValid}
                    onClick={(e) => sendData(e)}
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
    </>
  );
}
export default RegistrationPage;
