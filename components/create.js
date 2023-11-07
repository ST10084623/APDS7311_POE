import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const token = localStorage.getItem('token');
  console.log('Token in create', token);

  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });

  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create URL, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5050/record/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", position: "", level: "" });
    window.alert("Created successfully");
    navigate("/recordList");
  }

  // This following section will display the form that takes the input from the user.
  const formStyles = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const btnStyles = {
    backgroundColor: "#3498db",
    color: "#fff",
    transition: "background-color 0.3s",
  };

  const formControlStyles = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    width: "100%",
  };

  const h3Styles = {
    fontSize: "24px",
    color: "#3498db",
    textAlign: "center",
  };

  const labelStyles = {
    color: "#3498db",
  };

  return (
    <div className="container text-center" style={{ paddingTop: "100px" }}>
      <div className="col-md-6 offset-md-3">
        <div className="container rounded p-4" style={formStyles}>
          <img
            src="https://o.remove.bg/downloads/d76cb264-75e3-48bf-bcb3-0e2e9051047d/bd886d7ccc6f8dd8db17e841233c9656-removebg-preview.png"
            alt="Logo"
            style={{ width: "100px", height: "100px" }}
          />
          <h3 style={h3Styles}>Create New Record</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name" style={labelStyles}>Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
                style={formControlStyles}
              />
            </div>
            <div className="form-group">
              <label htmlFor="position" style={labelStyles}>Position</label>
              <input
                type="text"
                className="form-control"
                id="position"
                value={form.position}
                onChange={(e) => updateForm({ position: e.target.value })}
                style={formControlStyles}
              />
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="positionOptions"
                  id="positionIntern"
                  value="Intern"
                  checked={form.level === "Intern"}
                  onChange={(e) => updateForm({ level: e.target.value })}
                  style={formControlStyles}
                />
                <label htmlFor="positionIntern" className="form-check-label" style={labelStyles}>
                  Intern
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="positionOptions"
                  id="positionJunior"
                  value="Junior"
                  checked={form.level === "Junior"}
                  onChange={(e) => updateForm({ level: e.target.value })}
                  style={formControlStyles}
                />
                <label htmlFor="positionJunior" className="form-check-label" style={labelStyles}>
                  Junior
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="positionOptions"
                  id="positionSenior"
                  value="Senior"
                  checked={form.level === "Senior"}
                  onChange={(e) => updateForm({ level: e.target.value })}
                  style={formControlStyles}
                />
                <label htmlFor="positionSenior" className="form-check-label" style={labelStyles}>
                  Senior
                </label>
              </div>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-register btn-primary"
                style={btnStyles}
              >
                Create Person
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
