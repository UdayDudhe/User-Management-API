import React from "react";

function AdminUser(prop) {
  
  const fetchDelete = () => {
    console.log(`http://localhost:8080/deleteUser/${prop.user_id}`);
    fetch(`http://localhost:8080/deleteUser/${prop.user_id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    }).then((resp) => {
      if (resp.ok) {
        alert("Deleted");
        window.location.reload();
      } else {
        alert("Failed to delete user");
      }
    });
  };

  const fetchApprove = () => {
    fetch("http://localhost:8080/approveUser", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        user_id: prop.user_id,
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          alert("User approved");
          window.location.reload();
        } else {
          alert("Failed to approve user");
        }
      })
      .catch((error) => {
        alert("Server Error: " + error.message);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const result = window.confirm("Do you want to delete this user?");
    if (result) {
      fetchDelete();
    }
  };

  const handleApprove = (e) => {
    e.preventDefault();
    const result = window.confirm("Do you want to approve this user?");
    if (result) {
      fetchApprove();
    }
  };

  return (
    <tr>
      <td>{prop.user_id}</td>
      <td>{prop.first_name}</td>
      <td>{prop.last_name}</td>
      <td>{prop.username}</td>
      <td>{prop.email_id}</td>
      <td>
        <button className="btn btn-sm btn-success" onClick={handleApprove}>
          Approve
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default AdminUser;
