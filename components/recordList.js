import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button
        className="btn btn-danger" /* Apply a red background color to make it look like a delete button */
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
        style={{ backgroundColor: "red", borderRadius: "50px" }
      } /* Applied rounded corners to the button */
      >
        Delete
      </button>
    </td>
  </tr>
);


export default function RecordList() {
 const [records, setRecords] = useState([]);
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [records.length]);
  
  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE"
   
    });
    window.alert("Record Deleted.");
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
}
  // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
      
       />
     
     );
   });
 }
  // This following section will display the table with the records of individuals.
  return (
    <div>
    <style>
      {`
      /* Styling for Navbar */
      .navbar {
        background-color: #080808;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
      }
  
      .navbar-brand img {
        width: 100px;
        height: 100px; /* Set image size to 100x100 */
      }
  
      .navbar-toggler-icon {
        background-color: #fff;
      }
  
      .nav-link {
        color: #fff !important;
        margin-right: 20px;
      }
  
      /* Styling for Record List */
      h3 {
        font-size: 24px;
        margin: 20px 0;
      }
  
      table {
        width: 100%;
      }
  
      table th {
        background-color: #3498db;
        color: #fff;
        text-align: left;
        padding: 10px;
      }
  
      table td {
        padding: 10px;
      }
  
      /* Animation on hover */
      .nav-link:hover {
        background-color: #2e86de;
        transition: background-color 0.3s;
      }
  
      .table-striped tbody tr:hover {
        background-color: #f2f2f2;
        transition: background-color 0.3s;
      }
      `}
    </style>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        <img
          style={{ width: "100%" }}
          src="https://o.remove.bg/downloads/d76cb264-75e3-48bf-bcb3-0e2e9051047d/bd886d7ccc6f8dd8db17e841233c9656-removebg-preview.png"
          alt="Logo"
        />
      </NavLink>
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/create">
            Create Record
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </li>
      </div>
    </nav>
    <h3>Record List</h3>
  
    <table className="table table-striped" style={{ marginTop: 20 }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Level</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {recordList()}
      </tbody>
    </table>
  </div>
  
  );
};
