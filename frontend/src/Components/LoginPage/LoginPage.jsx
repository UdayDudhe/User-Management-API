import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else if (response.status === 401) {
        throw new Error("Invalid username or password");
      } else if (response.status === 403) {
        throw new Error("User not approved by admin");
      } else {
        throw new Error("Login failed");
      }
    })
    .then((message) => {
      setErrorMsg("");
      console.log(message)
      if (message === "Admin login successful") {
        navigate("/admindashboard");
      } else if (message === "User login successful") {
        navigate("/userdashboard");
      } else {
        setErrorMsg(message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      setErrorMsg("Error logging in");
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Check if both username and password are filled to enable the login button
    setIsFormValid(formData.username.trim() !== "" && formData.password.trim() !== "");
  };

  const handleReset = () => {
    setFormData({ username: "", password: "" });
    setErrorMsg("");
    setIsFormValid(false); // Reset the form validity state
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="username">Username:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password:</label>
              </td>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="button-container">
                <button type="submit" disabled={!isFormValid}>Login</button>
                <button type="reset">Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
}

export default LoginPage;
