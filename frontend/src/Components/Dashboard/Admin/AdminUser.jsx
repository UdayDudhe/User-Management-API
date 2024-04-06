import React from "react";

function AdminUser(prop) {
  
  const fetchDelete = () => {
    console.log(`http://localhost:8080/deleteUser/${prop.user_id}`);
    fetch(`http://localhost:8080/deleteUser/${prop.user_id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    }).then((resp) => {
      alert("Deleted");
      window.location.reload();
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const result = window.confirm("Do you want to proceed?");
    if (result) {
      fetchDelete();
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
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          <i className="bi bi-trash"></i> Delete
        </button>
      </td>
    </tr>
  );
}

export default AdminUser;
