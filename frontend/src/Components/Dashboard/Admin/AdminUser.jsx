import React from "react";
import "./AdminUser.css";

function AdminUser(prop) {
  const handleButtonClick = (e) => {
    e.preventDefault();
    const status = prop.is_approved ? "approve" : "disapprove";
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        is_approved: status,
        user_id: prop.user_id,
      }),
    };
    console.log(reqOptions);
    fetch("http://localhost:8080/approveUser", reqOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Cannot change status");
        }
      })
      .then((obj) => {
        console.log(obj);
        alert("Status Changed");
      })
      .catch((error) => alert("Server Error"));
  };

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
    /* eslint-disable no-restricted-globals */
    const result = confirm("Do you want to proceed?");
    /* eslint-enable no-restricted-globals */
    if (result) {
      fetchDelete();
    }
  };

  return (
    <div className="admin-user-container">
      <div className="card">
        <div className="card-header text-center">
          User ID: {prop.user_id}
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {prop.first_name} {prop.last_name}
            <span className="text-muted">
              (User Name: {prop.username})
            </span>
          </h5>
          <hr />
          <p>Email: {prop.email_id}</p>
          <div className="text-center">
            <button
              className="btn btn-sm btn-danger"
              onClick={handleDelete}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
