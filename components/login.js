// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const userCredentials = { ...form };

    // Send a request to your server to check if the user exists in MongoDB
    try {
      const response = await fetch("http://localhost:5050/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.status === 200) {
        // Successful login, navigate to the RecordList
        navigate("/recordList");
      } else if (response.status === 404) {
        // User not found
        window.alert("User not found. Please check your credentials.");
      } else {
        // Login failed for other reasons
        window.alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      window.alert("An error occurred. Please check the console for details.");
    }
  }

  return (
    <div>
  <style>
    {`
      /* Add this CSS to your stylesheets */
      /* Styling for Form Container */
      .container {
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      /* Styling for Form Heading */
      h3 {
        font-size: 24px;
        color: #3498db;
        text-align: center;
      }

      /* Styling for Form Elements */
      .form-control {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        width: 100%;
      }

      /* Styling for Login Button */
      .btn-login {
        background-color: #3498db;
        color: #fff;
        transition: background-color 0.3s;
        width: 100%;
        border-radius: 50px; /* Increased border-radius for a more curved button */
        padding: 15px 0; /* Increased padding to make the button larger */
        font-size: 20px; /* Increased font size for larger text */
      }

      .btn-login:hover {
        background-color: #9333FF;
      }

      /* Animation on Form Elements */
      .form-control {
        transition: border 0.3s;
      }

      .form-control:focus {
        border-color: #3498db;
      }
    `}
  </style>
  <div className="container text-center mt-5">
    <div className="row">
      <div className="col-md-12" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src="https://o.remove.bg/downloads/d76cb264-75e3-48bf-bcb3-0e2e9051047d/bd886d7ccc6f8dd8db17e841233c9656-removebg-preview.png"
          alt="Logo"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <div className="col-md-12">
        <h3>LOG INTO ACCOUNT</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
            
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Login"
              className="btn btn-login btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
}
