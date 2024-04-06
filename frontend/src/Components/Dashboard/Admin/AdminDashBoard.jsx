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

  // const handleLogout = () => {
  //   // Implement logout logic here, such as clearing tokens or session data
  //   localStorage.removeItem("token"); // Assuming you're using local storage for tokens
  //   // Redirect the user to the login page
  //   window.location.href = "/";
  // };

  return (
    <div className="container">
      <h2>Admin User Management</h2>
      {/* <button onClick={handleLogout}>Logout</button> */}
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
            <th>Delete User</th>
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
