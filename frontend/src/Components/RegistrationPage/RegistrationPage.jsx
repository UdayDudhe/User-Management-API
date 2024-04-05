import React from 'react';
import "./Registration.css";

function RegistrationPage() {
  return (
    <div className="registration-container">
      <form method="POST" className="form-horizontal">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email id</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
          />
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
