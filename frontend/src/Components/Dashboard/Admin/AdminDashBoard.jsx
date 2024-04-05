import React, { useState, useEffect } from "react";
import AdminUserCard from "./AdminUser"; // Renamed component for clarity

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/getAllUsers")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to fetch users");
        }
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        alert("Error fetching users: " + error.message); // Improved error message
      });
  }, []);

  const userCards = users.map((user) => (
    <AdminUserCard key={user.user_id} {...user} /> // Added key prop
  ));

  return (
    <>
      <legend>Admin User Management</legend>
      <div className="container-fluid w-70">{userCards}</div>
    </>
  );
}

export default AdminDashboard;
