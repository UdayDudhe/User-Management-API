import React from "react";
import { Link, useLocation} from "react-router-dom";
import "./NavLinks.css";

function NavLinks() {
  const location = useLocation();
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
          {location.pathname === "/admindashboard" && (
            <>
              <Link className="navbar-text" to="/">
                Logout
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavLinks;
