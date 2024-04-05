import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const message = await response.text();
        setErrorMsg("");
        if (message === "Admin login successful") {
          navigate("/admin-dashboard");
        } else if (message === "User login successful") {
          navigate("/user-dashboard");
        } else {
          setErrorMsg(message);
        }
      } else if (response.status === 401) {
        setErrorMsg("Invalid username or password");
      } else if (response.status === 403) {
        setErrorMsg("User not approved by admin");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Error logging in");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({ username: "", password: "" });
    setErrorMsg("");
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
                <button type="submit">Login</button>
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
