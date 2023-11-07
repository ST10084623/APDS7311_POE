import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   position: "",
   level: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/recordList");
        return;
      }
  
      setForm(record);
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      position: form.position,
      level: form.level,
    };
  
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5050/record/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    window.alert("Updated successfully");
    navigate("/recordList");

}
  // This following section will display the form that takes input from the user to update the data.
  const formStyles = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
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
    width: "100%", // Make input boxes expand to full width
  };
  
  const h3Styles = {
    fontSize: "24px",
    color: "#3498db",
    textAlign: "center",
  };
  
  const labelStyles = {
    color: "#3498db",
    textAlign: "center",
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
          <h3 style={h3Styles}>Update Record</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name" style={labelStyles}>
                Name
              </label>
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
              <label htmlFor="position" style={labelStyles}>
                Position
              </label>
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
                />
                <label htmlFor="positionSenior" className="form-check-label" style={labelStyles}>
                  Senior
                </label>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-register btn-primary" style={btnStyles}>
                Update Persons Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}
