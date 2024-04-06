import React, { useState, useEffect } from "react";
import AdminUser from "./AdminUser";

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
        alert("Error fetching users: " + error.message);
      });
  }, []);

  return (
    <div className="container">
      <h2>Admin User Management</h2>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Approve User</th>
            <th>Disapprove User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <AdminUser key={user.user_id} {...user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
