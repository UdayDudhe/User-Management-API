import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavLinks.css";

function NavLinks() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("loginId");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top  navbar-dark bg-dark">
        <div>
          <Link className="navbar-brand" to="/">
            <i className="bi bi-heart-pulse"></i>
            User Management System
          </Link>
        </div>

        <div>
          {location.pathname === "/" && (
            <>
              <div className="right-block">
                <Link className="navbar-text" to="/registration">
                  Register User
                </Link>

              </div>
            </>
          )}
          {location.pathname === "/registration" && (
            <>
              <Link className="navbar-text" to="/">
                Login
              </Link>
            </>
          )}
          {location.pathname === "/docHome" && (
            <>
              <Link className="navbar-text" to="/setAppointment">
                Set Appointment
              </Link>
              <Link className="navbar-text" to="/viewAllDocAppointment">
                View All Appointments
              </Link>
            </>
          )}
          {location.pathname === "/viewAllDocAppointment" && (
            <>
              <Link className="navbar-text" to="/setAppointment">
                Set Appointment
              </Link>
              <Link className="navbar-text" to="/docHome">
                Home
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {location.pathname === "/docProfile" && (
            <>
              <Link className="navbar-text" to="/docHome">
                Home
              </Link>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {location.pathname === "/viewAllPatAppointment" && (
            <>
              <Link className="navbar-text" to="/patientHome">
                Home
              </Link>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {location.pathname === "/patientHome" && (
            <>
              <Link className="navbar-text" to="/viewAllPatAppointment">
                View Appointments
              </Link>
            </>
          )}
          {location.pathname === "/adminHome" && (
            <>
              <Link className="navbar-text" to="/adminDoctor">
                All Doctors
              </Link>
              <Link className="navbar-text" to="/AdminViewAllAppointments">
                View All Appointments
              </Link>
            </>
          )}
          {location.pathname === "/adminDoctor" && (
            <>
              <Link className="navbar-text" to="/adminPatient">
                All Patients
              </Link>
              <Link className="navbar-text" to="/AdminViewAllAppointments">
                View All Appointments
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {location.pathname === "/adminPatient" && (
            <>
              <Link className="navbar-text" to="/AdminViewAllAppointments">
                View All Appointments
              </Link>
              <Link className="navbar-text" to="/adminDoctor">
                All Doctors
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
            {location.pathname === "/AdminViewAllAppointments" && (
            <>
               <Link className="navbar-text" to="/adminPatient">
                All Patients
              </Link>
              <Link className="navbar-text" to="/adminDoctor">
                All Doctors
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {location.pathname === "/setAppointment" && (
            <>
              <Link className="navbar-text" to="/viewAllDocAppointment">
                View All Appointments
              </Link>
              <Link className="navbar-text" to="/docHome">
                Home
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {location.pathname === "/getAppointment" && (
            <>
              <Link className="navbar-text" to="/patientHome">
                Home
              </Link>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {location.pathname.endsWith("Home") && (
            <>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavLinks;
